$(document).ready(function(){

  var $imageContainer = $("#image-container");

  // Generate Template
  var source = $("#image-template").html();
  var imageTemplate = Handlebars.compile(source);

  // Attempt to access token
  var tokenMatches = window.location.hash.match(/access_token=(.*)/);

  // If access token exists set into session cookie
  if(tokenMatches && tokenMatches[1]){
    window
      .sessionStorage
      .setItem("instagram_access_token", tokenMatches[1]);
  }

  // On click get location and IG feed
  $(document).on("click", ".find-me", function(e){
    if(window.sessionStorage.getItem("instagram_access_token")){
      e.preventDefault();

      // If geolocation is not supported
      if (!navigator.geolocation){
        alert("Geolocation is not supported by your browser");
        return;
      }

      // If lat and long postion is not cookied then get location
      if(!window.sessionStorage.getItem("instagram_lat") && !window.sessionStorage.getItem("instagram_lng")){
        navigator.geolocation.getCurrentPosition(success, error);
      }

      $.ajax({
        url : "https://api.instagram.com/v1/media/search?lat="+ window.sessionStorage.getItem("instagram_lat") + "&lng=" + window.sessionStorage.getItem("instagram_lng") + "&distance=5000&access_token=" + window.sessionStorage.getItem("instagram_access_token"),
        dataType: "jsonp",
        type : "GET",

        success : function(images){
          $imageContainer.html("");

          images.data.forEach(function(image){
            $imageContainer.append(imageTemplate(image.images.standard_resolution));
          });
        },
        error : function(){
          alert("Could not get photos near you");
        }

      });
    }else{
      alert("Please login to Instagram");
    }

  });

  function success(position) {
    window.sessionStorage.setItem("instagram_lat", position.coords.latitude);
    window.sessionStorage.setItem("instagram_lng", position.coords.longitude);
  }

  function error() {
    alert("Couldn't get your location");
  }




});
