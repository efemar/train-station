
var firebaseConfig = {
    apiKey: "AIzaSyD3iWElzZUhamAxuOdnV_wsoPmS-FOAzk8",
    authDomain: "fir-e52ad.firebaseapp.com",
    databaseURL: "https://fir-e52ad.firebaseio.com",
    projectId: "fir-e52ad",
    storageBucket: "",
    messagingSenderId: "359799195555",
    appId: "1:359799195555:web:e9bc5d529bbbdb22af7c16"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create a var for database
var database = firebase.database();

// listen to click from adding employee
$("#add").click(function (event) {

    // prevent page reloading
    event.preventDefault();

    // get each input and store in variable
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    // update to database
    database.ref("/trains").push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

})



// listen to child_added from the database and display database data to our table
database.ref("/trains").on("child_added", function (snapshot) {

    // create a new tr row
    var newRow = $("<tr>");


    //Calculation of next Arrival
    var tFrequency = snapshot.val().frequency;
    var firstTime = snapshot.val().firstTrain;


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var convertNextTrain = moment(nextTrain).format("HH:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));



    // create td elements
    var nameTd = $("<td>" + snapshot.val().name + "</td>");
    var destinationTd = $("<td>" + snapshot.val().destination + "</td>");
    var frequencyTd = $("<td>" + snapshot.val().frequency + "</td>");
    var convertNextTrainTd = $("<td>" + convertNextTrain + "</td>"); // This needs to be calculated based on  first train and frequency
    var minsAwayTd = $("<td>" + tMinutesTillTrain + "</td>"); //This needs to be calculated based on first train, frequency and current time

    // append td to tr
    newRow.append(nameTd, destinationTd, frequencyTd, convertNextTrainTd, minsAwayTd);

    // append tr to tbody
    $("tbody").append(newRow);



})




