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

// variable holding process arguments array
var args = process.argv
// our command variable is expected in index 2
var command = args[2]
// slice args array starting at index 3
var input = args.slice(3).join(" ");
// holding artists variable
var artist;
liri();

console.log(input)
function liri(){ 
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
            movieThis(input);
        } else{
            movieThis("Mr. Nobody")
                console.log("If you haven't watched 'Mr. Nobody' then you should: <http://www.imdb.com/title/tt0485947/>"),
                console.log("It's on Netflix!")
        }
        break;
    case "do-what-it-says":
        doWhatItSays();
};
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
                    var text = "\n" + "Search command:" + command + " " + input + "\n" + artist + " will be playing at " + concertInfo[i].venue.name + " in " + concertInfo[i].venue.city + ", " + concertInfo[i].venue.country + " on " + newDate + "\n"
                    log(text)             
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
       var text = "\n" + "Search command:" + command + " " + input + "\n" + returnSong.name + " was released by " + returnSong.artists[0].name + " on the album " + returnSong.album.name + "." + "\n" + "Preview Url:" + returnSong.preview_url + "\n"
       log(text)

    console.log(returnSong.name + " was released by " + returnSong.artists[0].name + " on the album " + returnSong.album.name + ".")
    console.log("Preview: " + returnSong.preview_url)
    console.log(" ")
    }
    console.log ("======================= Song Information for " + input + " =======================")
    console.log (" ")

  })
  .catch(function(err) {
    console.log("There's been an error: " + err);
  })

};

function movieThis(input) {
    queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
            var text = "\n" + "Search command:" + command + " " + input + "\n" + " Movie Title: " + response.data.Title + "\n" + "Release Year: " + response.data.Year + "\n" + "IMDB Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" + "Country Produced: " + response.data.Country + "\n" + "Language: " + response.data.Language + "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors + "\n"
            log(text)
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

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }  
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        command = dataArr[0]
        input = dataArr[1]
        liri(command, input)
      });
}

function log(text){
    fs.appendFile("log.txt", text, function(err) {
        if (err) {
            console.log(err)
        }
        else{
            console.log("Search has been logged!");
        }
    });

}