var deniedVenues = [];

(function (){
  angular.module('eatApp')
    .controller('goFetchController', [
        '$rootScope',
        '$scope',
        'eatTitle',
        'Geolocator',
        'VenueService',
        '$state',
        'uiGmapGoogleMapApi',
        goFetch
      ]);

  function goFetch ($rootScope, $scope, eatTitle, geolocation, VenueService, $state, googleMaps) {
    $scope.title = eatTitle;
    $scope.byline = 'LETS FETCH SOMETHING AWESOME';
    $scope.message = "Determining your location...";
    $scope.currentVenue;

    $rootScope.userLocation
      .then(function(position){
        $scope.position = position;
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        return position;
      }, function(reason){
        $scope.message = "Could not be determined";
      })

      .then(function(position) {
        VenueService
          .getVenues($scope.latitude, $scope.longitude)
          .then(function(venues){
            $scope.venues = venues;

            //Fetching keywords for help me function
            var foodCategories = [];
            var singleCategory;
            for (var i = 0; i < venues.length; i++){
              for (var j = 0; j < venues[i].categories.length; j++){
                singleCategory = venues[i].categories[j][0];
                if (foodCategories.indexOf(singleCategory) == -1){
                  foodCategories.push(singleCategory);
                }
              }
            }
            $scope.foodCategories = foodCategories;
            //End of foodCategories finder

            //Shuffle venues
            runShuffle(venues);

            //Load maps
            googleMaps
              .then(function(maps) {
                //Create map with user position as center
                var latlng = new maps.LatLng(position.coords.latitude, position.coords.longitude);
                var map = new maps.Map(document.getElementById('map_canvas'), {
                  zoom: 15,
                  center: latlng,
                  control: {}
                });

                var directionsService = new maps.DirectionsService();
                var directionsDisplay = new maps.DirectionsRenderer();
                directionsDisplay.setPanel(document.getElementById('directionsList'));
                directionsDisplay.setMap(map);

                //Create locations for user location and first venue
                var locations = [];
                createLocations(locations, position.coords.latitude, position.coords.longitude, 0);
                $scope.currentVenue = venues.shift();
                createLocations(locations, $scope.currentVenue.location.coordinate.latitude, $scope.currentVenue.location.coordinate.longitude, 1);

                var request = {
                  origin: locations[0].latitude + "," + locations[0].longitude,
                  destination: locations[1].latitude + "," + locations[1].longitude,
                  travelMode: maps.DirectionsTravelMode.DRIVING
                };

                calculateAndDisplayRoute(directionsService, directionsDisplay);

                //Swipe left, new venue
                $scope.getVenue = function(venues){
                  console.log('YOU ARE SWIPING LEFT');

                  deniedVenues.push($scope.currentVenue);
                  locations.splice(1, 1);
                  $scope.currentVenue = venues.shift();
                  createLocations(locations, $scope.currentVenue.location.coordinate.latitude, $scope.currentVenue.location.coordinate.longitude, 1);
                  request.destination = locations[1].latitude + "," + locations[1].longitude;

                  //Get directions to new venue
                  calculateAndDisplayRoute(directionsService, directionsDisplay);
                };

                function calculateAndDisplayRoute(directionsService, directionsDisplay){
                  directionsService.route(request, function(response, status){
                    if (status === maps.DirectionsStatus.OK) {
                      directionsDisplay.setDirections(response);
                    } else {
                      $scope.message = "Google route unsuccessful!";
                    }
                  });
                }
            });
          });
        });
    //Swipe right, select venue
    $scope.displayVenue = function (currentVenue){
      $state.go('results', {venue: currentVenue});
    };
  }
})();

function createLocations (arr, x, y, id) {
  var location = {
    latitude: x,
    longitude: y,
    id: id
  };
  arr.push(location);
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