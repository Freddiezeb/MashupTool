"use strict";

// Get our forms
var form = document.getElementById("search-form");
var fbShare = document.getElementById("fbShareVideo");
var ytPlayer = document.getElementById("ytVideo");
var omdbResult = document.getElementById("omdbResult");
var youtubeResult = document.getElementById("youtubeResult");

form.addEventListener("submit", function(event) {
    
    // Prevent the form to be sent
    event.preventDefault();
    
    // Take the user input and add it to a String
    var query = this.elements.query.value;

    // Object to handle AJAX
    var omdbAPI = new XMLHttpRequest();
    var youtubeAPI = new XMLHttpRequest();

    // omdb URL
    var omdbURL = "http://www.omdbapi.com/?t="+query+"&type=movie&apikey=e15d9329";

    omdbAPI.addEventListener("load", function() {

        // Convert the result from JSON 
        // Then add it to the youtube URL
        var result = JSON.parse(this.responseText);
        var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="+result.Title+ " trailer&key=AIzaSyA-83C98_XAXZ9NEYB2zj0TDlsSHXds8Uk";

        // Display the result
        omdbResult.innerHTML = "Movie title: " 
            + JSON.stringify(result.Title) 
            + " Year: " 
            + result.Year;

        // Sending youtube our URL
        youtubeAPI.open("get", youtubeURL, false);
        youtubeAPI.send(null);

        // Convert the result from JSON
        var ytResult = JSON.parse(youtubeAPI.responseText);

        // Display the result on the page and add it to the FB-share button
        youtubeResult.innerHTML = JSON.stringify(ytResult.items[0].snippet.title);
        ytPlayer.src = "https://www.youtube.com/embed/" + ytResult.items[0].id.videoId;
        fbShare.src = "https://www.facebook.com/plugins/share_button.php?href=" + ytPlayer.src + "&layout=button&size=small&mobile_iframe=true&width=60&height=20&appId";
        // console.log(result);
    }); 
    // Send request to the website for information (Get).
    omdbAPI.open("get", omdbURL, true);
    omdbAPI.send();
});