"use strict";

console.log("Success");// Hämta formuläret
var form = document.getElementById("search-form");
var ytPlayer = document.getElementById("ytVideo");

var omdbResult = document.getElementById("result");
var youtubeResult = document.getElementById("result2");

form.addEventListener("submit", function(event) {
    // Avbryt så att formuläret inte skickas
    event.preventDefault();
    // Sökord (query) för en film
    var query = this.elements.query.value;

    console.log("You searched for: ", query);

    // Objekt för att hantera AJAX
    var omdbAPI = new XMLHttpRequest();
    var youtubeAPI = new XMLHttpRequest();

    // Den URL vi ska använda oss av.
    var omdbURL = "http://www.omdbapi.com/?t="+query+"&type=movie&apikey=e15d9329";
    //    var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="+query+"&key=AIzaSyA-83C98_XAXZ9NEYB2zj0TDlsSHXds8Uk";

    // Vad vill vi göra när vi fått ett svar?
    omdbAPI.addEventListener("load", function() {
        // Konvertera resultatet från JSON
        var result = JSON.parse(this.responseText);
        // Skriv ut resultatet
        omdbesult.innerHTML = "Title: " 
            + JSON.stringify(result.Title) 
            + " Year: " 
            + JSON.stringify(result.Year);
        omdbResult.innerHTML = result.Title;
        console.log(result);
        var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="+result.Title+ " trailer&key=AIzaSyA-83C98_XAXZ9NEYB2zj0TDlsSHXds8Uk";

        youtubeAPI.addEventListener("load", function() {
            // Konvertera resultatet från JSON
            var result = JSON.parse(this.responseText);
            // Skriv ut resultatet
            youtubeResult.innerHTML = JSON.stringify(result.items[0].snippet.title);
            ytPlayer.src = "https://www.youtube.com/embed/" + result.items[0].id.videoId;
            console.log(result);
        }); 
        youtubeAPI.open("get", youtubeURL, true);
        youtubeAPI.send();
        
        
    }); 

    // Ange vilken metod (get) samt URL vi ska skicka med
    omdbAPI.open("get", omdbURL, true);
    omdbAPI.send();

});