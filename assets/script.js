
var firebaseConfig = {
    apiKey: "AIzaSyBTdWSBsREuyWms0-5ZLQh24bR9bouDdSU",
    authDomain: "train-activity-3050d.firebaseapp.com",
    databaseURL: "https://train-activity-3050d.firebaseio.com/",
    projectId: "train-activity-3050d",
    storageBucket: "train-activity-3050d.appspot.com",
    messagingSenderId: "671934313745",
    appId: "1:671934313745:web:3ab68dac22b9bb309448b0"
};

firebase.initializeApp(firebaseConfig);

var trainInput = firebase.database();

$("#trainBtn").on("click", function () {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("x");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }
    trainInput.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#fristTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

trainInput.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
})
