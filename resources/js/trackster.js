var Trackster = {};
var API_KEY = "4b5567ffcb798edc53fd42d71d4b0049";

$(document).ready(function() {
  $('#search').click(function() {
    Trackster.searchTracksByTitle($('.search-bar').val());
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  //Empties any previous HTML track list
  $('#song-list').empty();
  for(i = 0; i < tracks.length; i++) {
    //Stores the medium size album art of the track
    var mediumAlbumArt = tracks[i].image[1]["#text"];
    //Broken apart HTML code for the full song row
    var songHTML = '<div id="song" class="row">'+
    '<div class="col-xs-2 play-btn"><a href="'+ tracks[i].url +'"><i class="fa fa-play-circle-o fa-2x"></i></a></div>'+
    '<div class="col-xs-4 song-name">'+ tracks[i].name +'</div>'+
    '<div class="col-xs-2 artist">'+ tracks[i].artist +'</div>'+
    '<div class="col-xs-2 artwork"><img src="'+ mediumAlbumArt +'"></div>'+
    '<div class="col-xs-2 listeners">'+ tracks[i].listeners +'</div></div>';
    $('#song-list').append(songHTML);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  //Calls to the lastFM API with the given API key
  $.ajax({
    url:'https://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
    success: function(data) {
      Trackster.renderTracks(data.results.trackmatches.track);
    }
  });

};
