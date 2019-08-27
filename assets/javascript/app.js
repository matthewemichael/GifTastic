var topics = ["Seinfeld", "Always Sunny in Philadelphia", "Game of Thrones", "Breaking Bad", "Sopranos", "Stranger Things", "The Office", "The Simpsons", "Parks and Recreation", "Arrested Development"];


function displayShowInfo() {

    var show = $(this).attr("data-title");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&apikey=0EU2FV2cPQtQBcIb00uJ4hJlE4GKoGcR&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"

    }).then(function(response) {

        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var showDiv = $("<span>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var showImage = $("<img>");
            showImage.attr("src", results[i].images.fixed_height.url);
            showDiv.append(p);
            showDiv.append(showImage);
            $("#gifs").prepend(showDiv);
        }
          
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

$(document).on("click", ".show", displayShowInfo);

renderButtons();