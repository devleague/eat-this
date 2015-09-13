var deniedVenues = [];

(function (){
  angular.module('eatApp')
    .controller('goFetchController', [
        '$scope',
        'eatTitle',
        'Geolocator',
        'VenueService',
        goFetch
      ]);

  function goFetch ($scope, eatTitle, geolocation, VenueService) {

    $scope.title = eatTitle;
    $scope.byline = 'LETS FETCH SOMETHING AWESOME';
    $scope.message = "Determining your location...";

    geolocation()
      .then(function(position){
        $scope.position = position;
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;

        //create map with user position as center
        $scope.map = {
          center: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          zoom: 15,
          control: {}
        };

        //create user position marker
        var markers = [];
        createMarker(markers, position.coords.latitude, position.coords.longitude, 0);
        $scope.markers = markers;
        return markers;
      }, function(reason){
        $scope.message = "Could not be determined";
      })

      .then(function(markers) {

        VenueService
          .getVenues($scope.latitude, $scope.longitude)
          .then(function(venues){
            //first venue
            $scope.venues = venues;
            runShuffle(venues);

            $scope.name = venues[0].name;
            $scope.image = venues[0].image_url;
            createMarker(markers, venues[0].location.coordinate.latitude, venues[0].location.coordinate.longitude, 1);
            $scope.markers=markers;

            //directions to first venue
            var directionsDisplay = new google.maps.DirectionsRenderer();
            var directionsService = new google.maps.DirectionsService();

            $scope.directions = {
              origin: markers[0].latitude + "," + markers[0].longitude,
              destination: markers[1].latitude + "," + markers[1].longitude,
              showList: false
            };

            //define request to google maps directions api
            var request = {
              origin: $scope.directions.origin,
              destination: $scope.directions.destination,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            //get directions from google api
            directionsService.route(request, function(response, status){
              console.log(response);
              if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setPanel(document.getElementById('directionsList'));
                $scope.path = {
                  path: google.maps.geometry.encoding.decodePath(response.routes[0].overview_polyline),
                  stroke: {
                    color: "red",
                    opacity: 0.5
                  },
                  visible: true
                };
                $scope.directions.showList = true;
                $scope.distance = response.routes[0].legs[0].distance.text;
                $scope.travelTime = response.routes[0].legs[0].duration.text;
              } else {
                $scope.message = "Google route unsuccessful!";
              }
            });

            //swipe left, new venue
            $scope.getVenue = function(venues){
              console.log('YOU ARE SWIPING LEFT');

              deniedVenues.push(venues.shift());
              markers.splice(1, 1);

              $scope.name = venues[0].name;
              $scope.image = venues[0].image_url;
              createMarker(markers, venues[0].location.coordinate.latitude, venues[0].location.coordinate.longitude, 1);
              $scope.directions.destination = markers[1].latitude + "," + markers[1].longitude;
              request.destination = $scope.directions.destination;

              //get directions from google api
              directionsService.route(request, function(response, status){
                if (status === google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
                  directionsDisplay.setPanel(document.getElementById('directionsList'));
                  $scope.directions.showList = true;
                  $scope.distance = response.routes[0].legs[0].distance.text;
                  $scope.travelTime = response.routes[0].legs[0].duration.text;
                } else {
                  $scope.message = "Google route unsuccessful!";
                }
              });

            };
          });
      });
  }
})();

function createMarker (arr, x, y, id, icon) {
  var marker = {
    latitude: x,
    longitude: y,
    id: id
  };
  arr.push(marker);
}

function runShuffle (array){
  var currentIndex = array.length;
  var tempValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}