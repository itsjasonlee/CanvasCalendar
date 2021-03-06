/*

Goal = Automatically pull date from Canvas's To-Do list and move automatically create calendar events and notifications in Google Calendar

*/

chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
    chrome.identity.getAuthToken({ "interactive": true }, function(token) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://www.googleapis.com/calendar/v3/calendars/primary/events");
        xhr.addEventListener("load", function() {
            //console.log("event added!");
        });
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify(response));
    });
});

chrome.browserAction.onClicked.addListener(function(activeTab) {
    //console.log("clicked!");
});


function canvasCalendar() {
    if (window.location.href == "https://canvas.ucdavis.edu/") {
        const length = document.getElementsByClassName("todo-details").length;
        let box; //To store the html values temp
        let count = 0;
        for (i = 0; i < length; i++) {
            box = document.getElementsByClassName("todo-details")[i].children; //Pulls the 
            var Title = box[0].innerHTML; //Name
            var Description = box[1].innerHTML; //Description
            var dateField = box[2].innerHTML; //Set the date in the wrong format
            dateField = dateField.split('•'); //Split the dateField into point value + dates
            Description = Description.concat(dateField[0]); //Concat points to descirption

            console.log(Title);
            console.log(Description);


            dateField = dateField[1]; //converting date
            dateField = dateField.split(' ');

            var month = months(dateField[14]);  
            console.log(month);         
            var day = dateField[15];
            console.log(day);
            var time = militaryTime(dateField[17]); //Change the time into military format
            var result = '2018-' + month +'-' + day + 'T' + time + ':000' + 'Z'; //Putting the date into the correct format
            var dateField  = result;

            //Pass the relevant infomation to the Google Calendar API

            //Keep count of sucessful calendar events
            count++;
        }
        notify(count);
    }
}

//Convert the date from Month Day at Time to Google Calendar API Format
function months(dateField) {
    if (dateField == 'Jan')
        return 01;
    else if (dateField == 'Feb')
        return 02;
    else if (dateField == 'Mar')
        return 03;
    else if (dateField == 'Apr')
        return 04;  
    else if (dateField == 'May')
        return 05;  
    else if (dateField == 'June')
        return 06;  
    else if (dateField == 'July')
        return 07;  
    else if (dateField == 'Aug')
        return 08;  
    else if (dateField == 'Sept')
        return 09;  
    else if (dateField == 'Oct')
        return 10;
    else if (dateField == 'Nov')
        return 11;    
    else
        return 12;
}

//Convert the date into military format
function militaryTime(dateField) {
    var temp = dateField.split('am');
    temp2 = dateField.split('pm');
    if (temp2[1] == 'pm') {
        temp2[0] = time2[0] + 12;
        return temp2[0];
    }
    return temp[0];
}

//notify the user of the amount of sucessfully created events
function notify(count) {
    alert("Sucess! " + count + " calendar events are made");
}