$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyDsbprVG67czs4dRwO7tOJOSOUQIwsQseo",
    authDomain: "train-time-32355.firebaseapp.com",
    databaseURL: "https://train-time-32355.firebaseio.com",
    projectId: "train-time-32355",
    storageBucket: "train-time-32355.appspot.com",
    messagingSenderId: "518680099048"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "hh:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

    var  newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency,
    }

    database.ref().push(newTrain);

    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

  });

  database.ref().on("child_added", function(childSnapshot) {

    var FBtrainName = childSnapshot.val().trainName;
    var FBdestination = childSnapshot.val().destination;
    var FBfirstTrain = childSnapshot.val().firstTrain;
    var FBfrequency = childSnapshot.val().frequency;

    console.log(FBtrainName);
    console.log(FBdestination);
    console.log(FBfirstTrain);
    console.log(FBfrequency);

		var minutesAway = moment().diff(moment.unix(FBfirstTrain), "minutes") % FBfrequency ;
		var minutes = FBfrequency - minutesAway;

    var nextArrival = moment().add(minutes, "m").format("hh:mm A"); 

    var newRow = $("<tr>").append(
      $("<td>").text(FBtrainName),
      $("<td>").text(FBdestination),
      $("<td>").text(FBfrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway),
    );

    $("#train-table > tbody").append(newRow);

  });


});