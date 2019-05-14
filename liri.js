//read and set environment variables with .env package
require("dotenv").config();
//require axios
var axios = require("axios");
//require spotify npm
var Spotify = require("node-spotify-api")
//require moment npm
var moment = require('moment');


//import keys.js and store to keys
var keys = require("./keys.js");
// access spotify keys with spotify variable
var spotify = new Spotify(keys.spotify);
// require node file system
var fs = require("fs")


var args = process.argv
var command = args[2]
var input = args.slice(3).join(" ");
var artist;
var movie;
var song;
console.log(input)
switch(command){
    case "concert-this":
        concertThis(input);
        break;
    case "spotify-this-song":
        if (input){
            spotifyThis(input);
        } else{
            spotifyThis("The Sign Ace of Base")
        }
            break;
    case "movie-this":
    if (input){
        movieThis(input);;
    } else{
        movieThis("Mr. Nobody")
            console.log("If you haven't watched 'Mr. Nobody' then you should: <http://www.imdb.com/title/tt0485947/>"),
            console.log("It's on Netflix!")
    }

};

function concertThis(){
    artist = input
    axios.get("http://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(
            function(response){
                concertInfo = response.data
                console.log (" ")
                console.log ("======================= Concert Information for " + artist + " =======================")
                for (let i = 0; i < concertInfo.length; i++) {
                    var dateTime = concertInfo[i].datetime.split('T')
                    var date = dateTime[0]
                    var newDate = moment(date).format("MM/DD/YYYY")
                    console.log(artist + " will be playing at " + concertInfo[i].venue.name + " in " + concertInfo[i].venue.city + ", " + concertInfo[i].venue.country + " on " + newDate)                   
                }
                console.log ("======================= Concert Information for " + artist + " =======================")
                console.log (" ")

        })
        .catch(function(err) {
            console.log("There's been an error: " + err);
          })
};

function spotifyThis(input){
    spotify
  .search({ type: 'track', query: input })
  .then(function(response) {
    var songName = response.tracks.items
    var songNameLength = songName.length
    console.log (" ")
    console.log ("======================= Song Information for " + input + " =======================")
    for (let i = 0; i < songNameLength; i++) {
       returnSong = songName[i]
    console.log(returnSong.name + " was released by " + returnSong.artists[0].name + " on the album " + returnSong.album.name + ".")
    console.log("Preview: " + returnSong.preview_url)
    console.log(" ")
    }
    console.log ("======================= Song Information for " + input + " =======================")
    console.log (" ")

    // console.log(response.tracks.items);
  })
  .catch(function(err) {
    console.log("There's been an error: " + err);
  })

};

function movieThis(input) {
    queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            console.log(" ")
            console.log("======================= Movie Information for " + input + " =======================")
            console.log(" ")
            console.log("Movie Title: " + response.data.Title)
            console.log("Release Year: " + response.data.Year)
            console.log("IMDB Rating: " + response.data.imdbRating)
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("Country Produced: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors)
            console.log(" ")
            console.log("======================= Movie Information for " + input + " =======================")
      

        })
        .catch(function(err) {
            console.log("There's been an error: " + err)
        })
};



