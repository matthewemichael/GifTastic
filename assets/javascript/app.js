var topics = ["Seinfeld", "Always Sunny in Philadelphia", "Game of Thrones", "Breaking Bad", "Sopranos", "Stranger Things", "The Office", "The Simpsons", "Parks and Recreation", "Arrested Development"];

//  gets gifs from giphy api and displays on page
function displayTopicGifs() {

    var selectedTopic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectedTopic + "&apikey=0EU2FV2cPQtQBcIb00uJ4hJlE4GKoGcR&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"

    }).then(function(response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            // div created to hold gif 
            var topicDiv = $("<div>");
            // rating is displayed under each gif
            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            var topicImage = $("<img>");
            // add still and animated states for each gif
            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url);
            topicImage.attr("data-state", "still");
            topicImage.addClass("gif");

            // append image to the div
            topicDiv.append(topicImage);
            // prevent border from showing on page before gifs are loaded
            $("#gifs").css({
                "border" : "1px solid #c6c6c6"
            });
            // new gifs will be placed above previous selection
            topicDiv.append(p);
            $("#gifs").prepend(topicDiv);
        
        };   
    });
}    

// removes displayed gifs
function clearContent() {
    $("#gifs").empty();
    $("#gifs").removeAttr( 'style' );
}

// removes the last topic from display
function removeButton() {
    topics.pop(topics);  
    renderButtons();     
    return false;          
};

function refreshButtons() {
    $("#topics").empty();
    // loop through array to create button for each topic
    for (var i = 0; i < topics.length; i++) { 
        var buttons = $("<button>");
        buttons.addClass("btn btn-dark show");
        buttons.attr("data-name", topics[i]);
        buttons.text(topics[i]);
        $('#topics').append(buttons);
    } 
}

// creates buttons from topics array
function renderButtons() {
    // previous div elements are emptied
    $("#topics").empty();
    // loop through array to create button for each topic
    for (var i = 0; i < topics.length; i++) { 
        var buttons = $("<button>");
        buttons.addClass("btn btn-dark show");
        buttons.attr("data-name", topics[i]);
        buttons.text(topics[i]);
        $('#topics').append(buttons);
    } 
}

// click on gif to start or pause
$("#gifs").on("click", ".gif", function(event){
    event.preventDefault();
    // gets state of clicked gif
    var state = $(this).attr("data-state");
    // toggle between animated and still
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
            
});

// takes value from input box and adds to topics array, renderButtons adds new topic to button on page
$(".submit").on("click", function(event){
	event.preventDefault();

	console.log("submit");
	// sets inputted value to newTopic 
	newTopic = $("#topic-input").val().trim().replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()});
    // clears previous entry from form field after submit
    $("#topic-input").val("")
    // new topic is added to the topics array 
    topics.push(newTopic);
	// call the function that creates the new button
	renderButtons();
});

// click on button to generate 10 gifs related to that topic
$(document).on("click", ".show", displayTopicGifs);

$("#clear-content").on("click", clearContent);
$("#remove-topic").on("click", removeButton);
$("#refresh-topic").on("click", refreshButtons);

renderButtons();