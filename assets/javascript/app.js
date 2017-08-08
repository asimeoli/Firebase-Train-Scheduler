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
var ref = database.ref("trains");


//Button for adding trains
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();


    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var trainNextRun = $("#first-input").val().trim();

    var addTrain = {
        train: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        first: trainNextRun,
    };

    ref.push(addTrain);


    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#first-input").val("");

});

database.ref("trains").on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());


    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var trainFrequency = childSnapshot.val().frequency;
    var trainNextRun = moment(childSnapshot.val().first, "HH:mm");
    var currentTime = moment();
    var difference = moment.duration(trainNextRun.diff(moment())).asMinutes();

    //Train minutes away
    while (difference < 0) {
        trainNextRun.add(trainFrequency, "m");
        difference = moment.duration(trainNextRun.diff(moment())).asMinutes();
    }

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + trainNextRun.format("HH:mm") + "</td><td>" + Math.floor(difference) +
        "</td><td>" + currentTime.format("HH:mm") + "</td></tr>");
});