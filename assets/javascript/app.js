var topic = ["Basketball", "Football", "Hockey"];

$(document).ready(function () {

    renderButtons();

    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of sports
        for (var i = 0; i < topic.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var btn = $("<button>");
            // Adding a class of movie-btn to our button
            btn.addClass("sport-btn");
            // Adding a data-attribute
            btn.attr("data-sport", topic[i]);
            // Providing the initial button text
            btn.text(topic[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(btn);
        }
    }

    // This function handles events where a movie button is clicked
    $("body").on("click", "#add-sport", function (event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var sportInput = $("#sport-input").val().trim();

        // Adding movie from the textbox to our array
        topic.push(sportInput);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

    });

    $("body").on("click", ".sport-btn", function () {
        var sport = $(this).attr("data-sport");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            sport + "&api_key=8givL4D9FFRQo2Lb7vNLH6o6z9DdOmOm&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;

            $("#gifs-appear-here").empty();

            for (var i = 0; i < results.length; i++) {

                var sportDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var sportImage = $("<img>").attr("src", results[i].images.fixed_height_still.url)

                sportImage.addClass("gif");

                sportImage.attr("data-state", "still")

                sportImage.attr("data-still", results[i].images.fixed_height_still.url)

                sportImage.attr("data-animate", results[i].images.fixed_height.url)

                sportDiv.prepend(sportImage);
                sportDiv.prepend(p);

                $("#gifs-appear-here").prepend(sportDiv);
            }

            

            $("body").on("click", ".gif", function () {

                var state = $(this).attr("data-state");
        
                var animate = $(this).attr("data-animate");
        
                var still = $(this).attr("data-still");
        
                if (state === "still") {
        
                    $(this).attr("src", animate);
                    $(this).attr("data-state", "animate");
        
                } else {
        
                    $(this).attr("src", still)
                    $(this).attr("data-state", "still");
                }
            });


        });
    });
});