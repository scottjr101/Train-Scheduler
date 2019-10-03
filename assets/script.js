$(document).ready(function(){
// Initialize Firebase
 var config = {
     apiKey: "AIzaSyDEMc4M0_Zg0vvOjOzj0vx6rRiZOnfUEgM",
     authDomain: "counter-sml.firebaseapp.com",
     databaseURL: "https://counter-sml.firebaseio.com",
     projectId: "counter-sml",
     storageBucket: "",
     messagingSenderId: "709862406267",
     appId: "1:709862406267:web:414cf9c4045c1c3bcb0ade",
     measurementId: "G-Q5936WHQTK"
 };

 firebase.initializeApp(config);

 // Create a variable to reference the database.
 var database = firebase.database();

 // Initial Values
 var train = "";
 var destination = "";
 var trainTime = "";
 var frequency = "";

 //Conversion Variable
 var firstTimeConverted = '';
 var diffTime = '';
 var tRemainder;
 var tMinutesTillTrain;
 var nextTrain;

 //Data reference
 var trainNameData = '';
 var destData = '';
 var arrivalData = '';
 var freqData = '';
 var minutesAwayData = '';

 // Capture Button Click
 $("#add-train-btn").on("click", function (event) {
     event.preventDefault();

     // Grabbed values from text boxes
     train = $("#train-name-input").val().trim();
     destination = $("#destination-input").val().trim();
     trainTime = $("#train-time-input").val().trim();
     frequency = $("#frequency-input").val().trim();

     //Conversion

     //Convert to HH:MM
     firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
     //Converts the firsTimeCover object into string


     diffTime = moment().diff(moment(firstTimeConverted), "minutes");

     // Time apart (remainder)
     tRemainder = diffTime % frequency;

     // Minute Until Train
     tMinutesTillTrain = frequency - tRemainder;

     // Next Train
     nextTrain = moment().add(tMinutesTillTrain, "minutes");
     nextTrainFormat = moment(nextTrain).format('hh:mm');

     // Code for handling the push
     database.ref("Train_Scheduler").push({
         train: train,
         destination: destination,
         frenqency: frequency,
         arrival: nextTrainFormat,
         minutesAway: tMinutesTillTrain,

     });

     database.ref('Train_Scheduler').on('child_added', function (snap) {
         //Testing
         trainNameData = snap.val().train;
         destData = snap.val().destination;
         freqData = snap.val().frenqency;
         arrivalData = snap.val().arrival;
         minutesAwayData = snap.val().minutesAway;

         //Data array
         var dataArray = [trainNameData, destData, freqData, arrivalData, minutesAwayData];
         var newTr = $('<tr>');
         for (var i = 0; i < dataArray.length; i++) {
             var newTd = $('<td>');
             newTd.text(dataArray[i]);
             newTd.appendTo(newTr);
         }
         $('.TrainsMatter').append(newTr);
     });
 });
});