//weird bugs:: gifs all reset when you type in new city and hit SUBMIT
//weird bugs:: when gifs are clicked, 10 new gifs show up of who know what
//weird bugs:: new gifs populate APPEND instead of PREpend for some reason

//giphy api log-in link
var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=c0rIociiXYSeQgyzarZ3tNrThpgsMQms&limit=5");
xhr.done(function(response) { console.log("success got data", response); });


//first array of original gifs
var firstButtons = ["San Francisco", "New Orleans", "Chicago", "New York City", "Miami", "Louisville"];
limit = 10


// displayGif function re-renders the HTML to display the appropriate content
function displayGif(){
    var gif = $(this).attr("data-name");
    console.log(`displayGif gif: ${gif}`);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=c0rIociiXYSeQgyzarZ3tNrThpgsMQms&limit=5";

//creating an ajax call for the specific gifs button being clicked
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    for (var j = 0; j < limit; j++){
        var displayDiv = $("<div>");
        displayDiv.addClass("holder");
        var images = $("<img>");
        images.attr("src", response.data[j].images.original_still.url);
        images.attr("data-still", response.data[j].images.original_still.url);
        images.attr("data-animate", response.data[j].images.original.url);
        images.attr("data-state", "still");
        images.attr("class", "gif");
        displayDiv.prepend(images);
        var rating = response.data[j].rating;
        console.log(response);
        var pRating = $("<p>").text("Rating: " + rating);
        displayDiv.append(pRating)
        $("#my-gifs").prepend(displayDiv);
    }
});
}

//function for displaying gif data
function renderButtons() {
    $("#my-gifs").empty();
    for (var i =0; i < firstButtons.length; i++){
        var a =$("<button>");
        a.addClass("metro-button");
        a.attr("data-name",  firstButtons[i]);
        a.text(firstButtons[i]);
        $("#my-gifs").prepend(a);
    }
}

//on click event for gif button
$("#add-gif").on("click", function(event){
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    firstButtons.push(gif);
    renderButtons();

});

//click function for animation, this is NOT WORKING UGH
function imageState(){

    var state = $(this).attr("data-state");

      if (state === "still"){
        console.log("still")
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
  }


$(document).on("click", ".metro-button", displayGif);
$(document).on("click", ".gif", imageState);

renderButtons();
