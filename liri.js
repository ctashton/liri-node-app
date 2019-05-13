//read and set environment variables with .env package
require("dotenv").config();
//require axios
var axios = require("axios");
//require spotify npm
var Spotify = require("node-spotify-api")

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

switch(command){
    case "concert-this":
        concertThis(input);
    case "spotify-this-song"
        spotifyThis();
}

function concertThis(){
    artist = input
    axios.get("http://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(
            function(response){
                concertInfo = response.data
                console.log ("======================= Concert Information for " + artist + " =======================")
                for (let i = 0; i < concertInfo.length; i++) {
                    // var date = concertInfo[i].datetime.slice(0, 10)
                    var dateTime = concertInfo[i].datetime.split('T')
                    var date = dateTime[0]
                    var newDate = moment(date).format("MM/DD/YYYY")
                    console.log(artist + " will be playing at " + concertInfo[i].venue.name + " in " + concertInfo[i].venue.city + ", " + concertInfo[i].venue.country + " on " + newDate)                   
                }
        }   
    )
}

// function spotifyThis(){
//     artist = input;

// }

