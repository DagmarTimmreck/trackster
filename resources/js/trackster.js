var Trackster = {};
/* sample request for the lastFM API
http://ws.audioscrobbler.com/2.0/?method=track.search&track=tiny&api_key=11bae60aa9f2e11351232f006a9bfef8&format=json
*/
var API_KEY = '11bae60aa9f2e11351232f006a9bfef8'

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
  console.log(tracks[0].name);
  /* var ref = "#";
  for (var track of tracks) {
    trackHtml = '<div class="row">'
                + '<div class="col-xs-1 col-xs-offset-1">'
                + '<a href="https://www.youtube.com/watch?v=yYcyacLRPNs" class="glyphicon glyphicon-play-circle" aria-label="play"></a>'
                + '</div>'
                + '<div class="col-xs-3">'
                + '1 Fairytale in the Supermarket'
                + '</div>'
                + '<div class="col-xs-2">'
                + 'The Raincoats'
                + '</div>'
                + '<div class="col-xs-2">'
                + 'The Raincoats'
                + '</div>'
                + '<div class="col-xs-1">'
                + '101,839'
                + '</div>';
    $('main').append(trackHtml);
  }
  */
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track="
              + title + "&api_key=" + API_KEY + "&format=json",
        datatype: 'jsonp',
        success: function(data) {
               Trackster.renderTracks(data.results.trackmatches.track);
            }
  });
};
