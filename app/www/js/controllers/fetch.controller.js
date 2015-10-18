(function (){
  angular.module('eatApp')
    .controller('goFetchController', [
        '$rootScope',
        '$scope',
        'Geolocator',
        'VenueService',
        '$state',
        'uiGmapGoogleMapApi',
        'uiGmapIsReady',
        goFetch
      ]);

  function goFetch ($rootScope, $scope, geolocation, VenueService, $state, googleMaps, uiGmapIsReady) {
    var deniedVenues = [];
    $scope.currentVenue;

    if ($rootScope.selectedLocation) {
      loadVenues($rootScope.selectedLocation);
    } else {
      $rootScope.userLocation
        .then(function(position){
          loadVenues(position);
        }, function(reason){
          $scope.message = "Geolocation could not be determined";
        })
        .catch(function(err){
          console.log(err);
        });
    }

    function loadVenues(position) {
      $scope.position = true;

      VenueService
        .getVenues(position.coords.latitude, position.coords.longitude)
        .then(function(venues){
          $scope.venues = venues;
          //Shuffle venues
          runShuffle(venues);

          //Load maps
          googleMaps
            .then(function(maps) {
              //Create map with user position as center
              $scope.map = {
                zoom: 15,
                center: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                  },
                control: {},
                options: {disableDefaultUI: true}
              };

              uiGmapIsReady.promise(1)
                .then(function(map_instances){
                  var directionsService = new maps.DirectionsService();
                  var directionsDisplay = new maps.DirectionsRenderer();
                  var map = map_instances[0].map;
                  directionsDisplay.setMap(map);

                  $scope.currentVenue = venues.shift();

                  var request = {
                    origin: position.coords.latitude + "," + position.coords.longitude,
                    destination: $scope.currentVenue.location.coordinate.latitude + "," + $scope.currentVenue.location.coordinate.longitude,
                    travelMode: maps.DirectionsTravelMode.DRIVING
                  };

                  calculateAndDisplayRoute(directionsService, directionsDisplay);

                  //Swipe left, new venue
                  $scope.getVenue = function(venues){
                    if (venues.length !== 0){
                      deniedVenues.push($scope.currentVenue);
                      $scope.currentVenue = venues.shift();
                      request.destination = $scope.currentVenue.location.coordinate.latitude + "," + $scope.currentVenue.location.coordinate.longitude;
                      //Get directions to new venue
                      calculateAndDisplayRoute(directionsService, directionsDisplay);
                    } else {
                      $state.go('help-me');
                    }
                  };

                  function calculateAndDisplayRoute(directionsService, directionsDisplay){
                    directionsService.route(request, function(response, status){
                      if (status === maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        $scope.currentVenue.directions = response;
                        $scope.duration = $scope.currentVenue.directions.routes[0].legs[0].duration.text;
                      } else {
                        $scope.message = "Google route unsuccessful!";
                      }
                    });
                  }
                });
          });
        });
    }

    //Swipe right, select venue
    $scope.displayVenue = function (currentVenue){
      $state.go('results', {venue: currentVenue});
    };
  }
})();

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