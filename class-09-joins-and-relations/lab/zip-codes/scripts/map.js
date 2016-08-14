function initMap(results) {
  if (results) {
    console.log(results);
    var resultsMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: parseFloat(results[0].latitude), lng: parseFloat(results[0].longitude)},
    scrollwheel: true,
    zoom: 10
  });
    results.forEach(function(marker) {
      console.log(marker);
      var latlng = new google.maps.LatLng(parseFloat(marker.latitude), parseFloat(marker.longitude));
      var marker = new google.maps.Marker({
        position: latlng,
        title: marker.city,
      })
      marker.setMap(resultsMap);
    });
  } else {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.611435, lng: -122.330456},
      scrollwheel: true,
      zoom: 8
    })
  }

  };
  // Create a map object and specify the DOM element for display.
  // TODO: Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
