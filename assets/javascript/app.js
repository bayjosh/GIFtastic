//Create initial array of sports
var topic = ["Basketball", "Football", "Curling", "Volleyball", "Dodgeball", "Kickball", "Baseball", "Soccer"];


$(document).ready(function () {


//Event listener that pushes user input into array and creates an associated button

    $("body").on("click", "#add-sport", function (event) {
        event.preventDefault();

        var sportInput = $("#sport-input").val().trim();

        topic.push(sportInput);

        $("#sport-input").val("");

        renderButtons();

    });

//Puts buttons on the page from the array of sports
    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topic.length; i++) {

            var btn = $("<button>");
          
            btn.addClass("sport-btn btn btn-success");
            
            btn.attr("data-sport", topic[i]);
            
            btn.text(topic[i]);
            
            $("#buttons-view").append(btn);
        };
    };
    
    //Calls the function
    renderButtons();



    //Event listener to trigger the AJAX request
    $("body").on("click", ".sport-btn", function () {
        var sport = $(this).attr("data-sport");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            sport + "&api_key=8givL4D9FFRQo2Lb7vNLH6o6z9DdOmOm&limit=10";


        //AJAX request    
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

            var results = response.data;

            $("#gifs-appear-here").empty();

            //For loop to put gifs on the page
            for (var i = 0; i < results.length; i++) {

                var sportDiv = $("<div class='item'>");

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

            //Event listener to trigger play/pause functionality
            $(".gif").on("click", function () {

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