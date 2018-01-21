function canvasCalendar() {
    if (window.location.href == "https://canvas.ucdavis.edu/") {
        const length = document.getElementsByClassName("todo-details").length;
        let box; //To store the html values temp
        let count = 0;
        for (i = 0; i < length; i++) {
            box = document.getElementsByClassName("todo-details")[i].children; //Pulls the 
            var Title = box[0].innerHTML; //Name
            var Description = box[1].innerHTML; //Description
            var dateField = box[2].innerHTML; //Set the date
            dateField = dateField.split('•'); //Split the dateField into point value + dates
            Description = Description.concat(dateField[0]); //Give points to descirption
            dateField = dateField[1]; //Set the Date.
            console.log(dateField);
            console.log(Description);
            console.log(Title);
            count++;
        }
        notify(count);
    }
}

function notify(count) {
    alert("Sucess! " + count + " calendar events are made");
}