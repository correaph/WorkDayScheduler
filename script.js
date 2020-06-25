/*Global variable to keep record of the activities*/
var activities = null;
/*Loads activities previously saved and displays them, allowing editions*/
$(document).ready(function () {
    $("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a')).addClass("hour");
    activities = JSON.parse(localStorage.getItem("activities"));
    if (activities === null) {
        activities = [
            ["09am", "09", ""],
            ["10am", "10", ""],
            ["11am", "11", ""],
            ["12pm", "12", ""],
            ["01pm", "13", ""],
            ["02pm", "14", ""],
            ["03pm", "15", ""],
            ["04pm", "16", ""],
            ["05pm", "17", ""]
        ]
    }
    var container = $(".container");
    for (var i = 0; i < activities.length; i++) {
        var formList = $("<div>");
        formList.addClass("row");
        var activTime = $("<label>").text(activities[i][0]);
        activTime.addClass("time-block");
        formList.append(activTime);
        var activText = $("<textarea>").val(activities[i][2]);
        activText.width("90%");
        activText.attr("id", "text-" + i);
        formList.append(activText);
        activText.addClass("description");
        var saveButton = $("<button>").text("Save");
        saveButton.addClass("saveBtn");
        saveButton.attr("id", "button-" + i);
        formList.append(saveButton);
        container.append(formList);
        var now = moment().format('HH');
        if (now === activities[i][1]) {
            formList.addClass("present");
        } else if (now < activities[i][1]) {
            formList.addClass("past");
        } else {
            formList.addClass("future");
        }
    }
    formList.css("margin-bottom","50px");
});
/*Saves activities in local storage, when 'save' button is clicked*/
$(document).on("click", ".saveBtn", function () {
    var actIndex = parseInt($(this).attr("id").substring(7));
    activities[actIndex][2] = $("#text-" + actIndex).val();
    localStorage.setItem("activities",JSON.stringify(activities));
});