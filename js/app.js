$(document).ready(function(){

  // Attempt to access token
  var tokenMatches = window.location.hash.match(/access_token=(.*)&token_type=*/);

  // If access token exists set into session cookie
  if(tokenMatches && tokenMatches[1]){
    var accessToken = tokenMatches[1];
    window
    .sessionStorage
    .setItem("spotify_access_token", accessToken);
  }

  /* $.ajax({
    url : "",
    dataType: "jsonp",
    type : "GET",

    success : function(){


    },




  }); */


});
