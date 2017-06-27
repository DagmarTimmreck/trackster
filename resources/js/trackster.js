var Trackster = {};
/* sample request for the lastFM API
http://ws.audioscrobbler.com/2.0/?method=track.search&track=tiny&api_key=11bae60aa9f2e11351232f006a9bfef8&format=json
*/
var API_KEY = '11bae60aa9f2e11351232f006a9bfef8'
var TABLE_HEADER = '<div class="row table-header">'
                   + '<div class="col-xs-3 col-xs-offset-2"> # Song </div>'
                   + '<div class="col-xs-2">Artist</div>'
                   + '<div class="col-xs-2">Album</div>'
                   + '<div class="col-xs-3">Listeners</div>'
                   + '</div>';

/* init event handler when document is ready */
$(document).ready(function() {
  $('#search').click(function() {
    Trackster.searchTracksByTitle($('#input').val());
  })


});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  var $main = $('main');
  $main.empty();
  $main.append($(TABLE_HEADER));

  for (var i=0; i<tracks.length; i++) {
    var track = tracks[i];
    var mediumAlbumArt = track.image[1]['#text'];
    trackHtml = '<div class="row">'
                + '<div class="col-xs-1 col-xs-offset-1">'
                + '<a href="' + track.url + '" class="glyphicon glyphicon-play-circle" aria-label="play"></a>'
                + '</div>'
                + '<div class="col-xs-3">'
                + (i+1) + ' ' + track.name
                + '</div>'
                + '<div class="col-xs-2">'
                + track.artist
                + '</div>'
                + '<div class="col-xs-2">'
                + '<img src='
                + mediumAlbumArt
                + '>'
                + '</div>'
                + '<div class="col-xs-1">'
                + track.listeners
                + '</div>';
    $main.append($(trackHtml));
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
        url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track="
              + title + "&api_key=" + API_KEY + "&format=json",
        datatype: 'jsonp',
        success: function(data) {
               Trackster.renderTracks(data.results.trackmatches.track);
            }
  });
};
