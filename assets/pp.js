// Initialize Firebase
var config = {
    apiKey: "AIzaSyAVCJWRbCgH12_EazQCMVJUC08RRrY3754",
    authDomain: "train-activity-ef055.firebaseapp.com",
    databaseURL: "https://train-activity-ef055.firebaseio.com",
    projectId: "train-activity-ef055",
    storageBucket: "train-activity-ef055.appspot.com",
    messagingSenderId: "584028123152"
};
firebase.initializeApp(config);

var database = firebase.database();

//Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = $("frequency-input").val().trim();
    var trainNextArrival = moment($("#next-input").val().trim(), "HH:mm").format("X");
    var trainMinAway = $("#minaway-input").val().trim();

    // Creates local "temporary" object for holding train data
    var addTrain = {
        train: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        next: trainNextArrival,
        minutes: trainMinAway,
    };

    // Uploads employee data to the database
    database.ref().push(addTrain);

    // Logs everything to console
    console.log(addTrain.train);
    console.log(addTrain.destination);
    console.log(addTrain.frequency);
    console.log(addTrain.next);
    console.log(addTrain.minutes);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#next-input").val("");
    $("minaway-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row 
//in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainNextArrival = childSnapshot.val().next;
    var trainMinAway = childSnapshot.val().minutes;

    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(trainNextArrival);
    console.log(trainMinAway);

    // Prettify the employee start
    var trainNextArrivalPretty = moment.unix(trainNextArrival).format("HH:mm");

    // Calculate the minites away

    var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
        empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});