
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
    var start = moment(snapshot.val().startDate, "MM/DD/YYYY");
    var month = moment().diff(start, "months");
    var totalBilled = month * snapshot.val().monthRate;



    //Calculation of mins Away
    



    // create 6 td element
    var nameTd = $("<td>" + snapshot.val().name + "</td>");
    var destinationTd = $("<td>" + snapshot.val().destination + "</td>");
    //var firstTrainTd = $("<td>" + snapshot.val().firstTrain + "</td>"); //this will logged in the database, but it will not be displayed on the html
    var frequencyTd = $("<td>" + snapshot.val().frequency + "</td>");
    var nextArrivalTd = $("<td>" + month + "</td>"); // This needs to be calculated based on  first train and frequency
    var minsAwayTd = $("<td>" + totalBilled + "</td>"); //This needs to be calculated based on first train, frequency and current time

    // append td to tr
    newRow.append(nameTd, destinationTd, frequencyTd, nextArrivalTd, minsAwayTd);

    // append tr to tbody
    $("tbody").append(newRow);




})