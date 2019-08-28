var topics = ["Seinfeld", "Always Sunny in Philadelphia", "Game of Thrones", "Breaking Bad", "Sopranos", "Stranger Things", "The Office", "The Simpsons", "Parks and Recreation", "Arrested Development"];


function displayTopicGifs() {

    var selectedTopic = $(this).attr("data-title");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectedTopic + "&apikey=0EU2FV2cPQtQBcIb00uJ4hJlE4GKoGcR&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"

    }).then(function(response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var topicDiv = $("<span>");
            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            var topicImage = $("<img>");

            topicImage.attr("src", results[i].images.fixed_height_still.url);
            topicImage.attr("data-still", results[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", results[i].images.fixed_height.url)
            topicImage.attr("data-state", "still")
            topicImage.addClass("gif");


            topicDiv.append(topicImage);
            $("#gifs").css({
                "border" : "1px solid #c6c6c6"
            });
            topicDiv.append(p);
            $("#gifs").prepend(topicDiv);
        
        };   
    });
}    

function renderButtons() {

    $('#topics').empty();

    for (var i = 0; i < topics.length; i++) { 
        var buttons = $("<button>");
        buttons.addClass("btn btn-dark show");
        buttons.attr("data-title", topics[i]);
        buttons.text(topics[i]);
        $('#topics').append(buttons);
    } 
}

$("#gifs").on("click", ".gif", function(){
    
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
            
});

$(document).on("click", ".show", displayTopicGifs);

renderButtons();