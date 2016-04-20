$(document).ready(function(){

  // Generate Template
  var source = $("#image-template").html();
  var imageTemplate = Handlebars.compile(source);

  // Attempt to access token
  var tokenMatches = window.location.hash.match(/access_token=(.*)/);

  // If access token exists set into session cookie
  if(tokenMatches && tokenMatches[1]){
    var accessToken = tokenMatches[1];
    window
    .sessionStorage
    .setItem("instagram_access_token", accessToken);
  }

  $(document).on("click", ".find-me", function(e){
    e.preventDefault();

    if (!navigator.geolocation){
      alert("Geolocation is not supported by your browser");

    }else if(window.sessionStorage.getItem("instagram_lat") && window.sessionStorage.getItem("instagram_lng")){

    }else{
      navigator.geolocation.getCurrentPosition(success, error);
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      window
        .sessionStorage
        .setItem("instagram_lat", latitude);
      window
        .sessionStorage
        .setItem("instagram_lng", longitude);
    }

    function error() {
      alert("Couldn't get your location");
    }

    $.ajax({
      url : "https://api.instagram.com/v1/media/search?lat="+ window.sessionStorage.getItem("instagram_lat") + "&lng=" + window.sessionStorage.getItem("instagram_lng") + "&distance=5000&access_token=" + window.sessionStorage.getItem("instagram_access_token", accessToken),
      dataType: "jsonp",
      type : "GET",

      success : function(images){
        images.data.forEach(function(image){
          $("#image-container").append(imageTemplate(image.images.standard_resolution));
        });
      },
      error : function(){
        alert("Could not get photos near you");
      }

    });

  });



});
