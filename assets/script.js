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

 // Capture Button Click
 $("#add-train-btn").on("click", function (event) {
     event.preventDefault();

     // Grabbed values from text boxes
     var train = $("#train-name-input").val().trim();
     var destination = $("#destination-input").val().trim();
     var trainTime = $("#train-time-input").val().trim();
     var frequency = $("#frequency-input").val().trim();

     // Code for handling the push
     database.ref("Train_Scheduler").push({
         train: train,
         destination: destination,
         frenqency: frequency,
         startTrain: trainTime,
        });

     // Clears all of the text-boxes
	  $("#train-name-input").val("");
	  $("#destination-input").val("");
	  $("#train-time-input").val("");
	  $("#frequency-input").val("");

    });
     database.ref('Train_Scheduler').on('child_added', function (snap) {
         //Testing
         var trainNameData = snap.val().train;
         var destData = snap.val().destination;
         var freqData = snap.val().frenqency;
         firstTrain = snap.val().startTrain;
         
        // Declare variable
  		var freqData;

  		// Time is to be entered on the entry form
   		 var firstTime = 0;

	    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

	    // Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		// Time apart (remainder)
	    var tRemainder = diffTime % freqData;

	    // Minute Until Train
	    var tMinutesTillTrain = freqData - tRemainder;

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	    // Add each train's data into the table
	    $(".TrainsMatter").append("<tr><td>" + trainNameData + "</td><td>" + destData + "</td><td>" + freqData + 
	    "</td><td>" + moment(nextTrain).format("LT") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

        });

     
 
});