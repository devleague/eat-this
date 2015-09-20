(function (){
  angular.module('eatApp')
    .controller('helpMeController', [
        '$rootScope',
        '$scope',
        'eatTitle',
        'Geolocator',
        'VenueService',
        '$state',
        'uiGmapGoogleMapApi',
        '$http',
        getRestaurantsByCategory
      ]);

  function getRestaurantsByCategory ($rootScope, $scope, eatTitle, geolocation, VenueService, $state, googleMaps, $http) {
    $scope.title = eatTitle;
    $scope.byline = 'LETS GET SOMETHING TO EAT';

    $http.get("/api/restaurants")
      .then(function(res){
        var categoryDataBase = res.data;
        return categoryDataBase;
      })
      .then(function(categoryDataBase){



        console.log(categoryDataBase);
      });


    $scope.currentVenue;

    $rootScope.userLocation
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
            //console.log(venues);
            ///////////////////////////////////////
            //fetching keywords for help me function
            var foodCategories = [];
            var singleCategory;
            var categoryVenue;
            var categoryObject = {};

            for (var i = 0; i < venues.length; i++){

              for (var j = 0; j < venues[i].categories.length; j++){

                singleCategory = venues[i].categories[j][0];
                categoryVenue = venues[i].id;

                if (foodCategories.indexOf(singleCategory) == -1){
                  categoryObject = {
                  "category": singleCategory,
                  "venue" : categoryVenue
                };
                  foodCategories.push(categoryObject);
                }
              }
            }
            console.log(foodCategories);

            $scope.foodCategories = foodCategories;

            //End of foodCategories finder
            //////////////////////////////



            $scope.venues = venues;
            runShuffle(venues);

            $scope.currentVenue = venues.shift();
            createMarker(markers, $scope.currentVenue.location.coordinate.latitude, $scope.currentVenue.location.coordinate.longitude, 1);
            $scope.markers=markers;

            googleMaps
              .then(function(maps) {

                //directions to first venue
                $scope.directions = {
                  origin: markers[0].latitude + "," + markers[0].longitude,
                  destination: markers[1].latitude + "," + markers[1].longitude,
                  showList: false
                };

                var request = {
                  origin: $scope.directions.origin,
                  destination: $scope.directions.destination,
                  travelMode: maps.DirectionsTravelMode.DRIVING
                };

                var directionsService = new maps.DirectionsService();
                var directionsDisplay = new maps.DirectionsRenderer();

                directionsService.route(request, function(response, status){
                  if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    directionsDisplay.setPanel(document.getElementById('directionsList'));
                    // $scope.path = {
                    //   path: google.maps.geometry.encoding.decodePath(response.routes[0].overview_polyline),
                    //   stroke: {
                    //     color: "red",
                    //     opacity: 0.5
                    //   },
                    //   visible: true
                    // };
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

                  deniedVenues.push($scope.currentVenue);
                  $scope.currentVenue = venues.shift();
                  markers.splice(1, 1);
                  createMarker(markers, $scope.currentVenue.location.coordinate.latitude, $scope.currentVenue.location.coordinate.longitude, 1);
                  $scope.directions.destination = markers[1].latitude + "," + markers[1].longitude;
                  request.destination = $scope.directions.destination;

                  //get directions to new venue
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
        });

      $scope.displayVenue = function (currentVenue){
      console.log('displaying venue');
      console.log(currentVenue);
      $state.go('results', {venue: currentVenue});
    };

  }
})();

