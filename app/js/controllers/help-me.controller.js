(function (){
  angular.module('eatApp')
    .controller('helpMeController', [
        '$rootScope',
        '$scope',
        'eatTitle',
        'Geolocator',
        'CategoryService',
        'VenueService',
        '$state',
        'uiGmapGoogleMapApi',
        getRestaurantsByCategory
      ]);

  function getRestaurantsByCategory ($rootScope, $scope, eatTitle, geolocation, CategoryService, VenueService, $state, googleMaps) {
    $scope.title = eatTitle;
    $scope.byline = 'LETS GET SOMETHING TO EAT';

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

        // CategoryService
        //   .getCategories()
        //   .then(function(categories){ // need to return categories above line
        //     $scope.categories = categories;

        //   console.log(categories);





        //   });

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

                // if (foodCategories.indexOf(singleCategory) == -1){
                  categoryObject = {
                  "category": singleCategory,
                  "venue" : categoryVenue
                };
                  foodCategories.push(categoryObject);
                //}
              }
            }

            runShuffle(foodCategories);
            console.log(foodCategories);
            debugger;
            $scope.foodCategories = foodCategories;
          });


            //$scope.currentVenue = foodCategories.shift();
            // createMarker(markers, $scope.currentVenue.location.coordinate.latitude, $scope.currentVenue.location.coordinate.longitude, 1);
            // $scope.markers=markers;

            googleMaps
              .then(function(maps) {

                //swipe left, new venue
                $scope.getVenue = function(foodCategories){
                  console.log('YOU ARE SWIPING LEFT');

                  deniedVenues.push($scope.currentVenue);
                  $scope.currentVenue = foodCategories.shift();
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
        };

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