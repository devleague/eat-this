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
        '$http',
        getRestaurantsByCategory
      ]);

  function getRestaurantsByCategory ($rootScope, $scope, eatTitle, geolocation, CategoryService, VenueService, $state, googleMaps, $http) {
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

        // CategoryService
        //   .displayCategory()
        //   .then(function(categoryDataBase){
        //     console.log(categoryDataBase);
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


                  categoryObject = {
                  "category": singleCategory,
                  "venue" : categoryVenue
                };
                  foodCategories.push(categoryObject);


              }
            }

            runShuffle(foodCategories);

            $scope.foodCategories = foodCategories;

            $http.get('/js/categories.json')
              .success(function (data){
                //$scope.categoryDB = data;
                //console.log(data);
                //console.log(foodCategories);

                //loop through image array and check if is also present in other array
                var dataCat;
                var dataImage1, dataImage2;
                var venueCat;
                var venueName;
                var displayObjectArray = [];
                for (var x = 0; x < data.length; x++){
                  dataCat = data[x].category;
                  dataImage1 = data[x].primary_image;
                  dataImage2 = data[x].secondary_image;

                  for (var y = 0; y < foodCategories.length; y++){
                    venueCat = foodCategories[y].category;
                    venueName = foodCategories[y].venue;

                    if (dataCat === venueCat){
                      displayObjectArray.push({
                        "category": dataCat,
                        "venue": venueName,
                        "primary_image": dataImage1,
                        "secondary_image": dataImage2
                      });
                    }
                  }

                }
                $scope.displayObjectArray = displayObjectArray;
                console.log(displayObjectArray);
                $scope.currentCategory = displayObjectArray.shift();

              });

          });

            // googleMaps
            //   .then(function(maps) {

            //     //swipe left, new venue
            var emptyArray = [];
            $scope.getCategory = function(displayObjectArray){

              emptyArray.push($scope.currentCategory);
              $scope.currentCategory = displayObjectArray.shift();
              console.log('YOU ARE SWIPING LEFT');

            }
            //     $scope.getVenue = function(foodCategories){
            //       console.log('YOU ARE SWIPING LEFT');

            //       deniedVenues.push($scope.currentVenue);
            //       $scope.currentVenue = foodCategories.shift();
            //       markers.splice(1, 1);
            //       createMarker(markers, $scope.currentVenue.location.coordinate.latitude, $scope.currentVenue.location.coordinate.longitude, 1);
            //       $scope.directions.destination = markers[1].latitude + "," + markers[1].longitude;
            //       request.destination = $scope.directions.destination;

                  //get directions to new venue
                  // directionsService.route(request, function(response, status){
                  //   if (status === google.maps.DirectionsStatus.OK) {
                  //     directionsDisplay.setDirections(response);
                  //     directionsDisplay.setPanel(document.getElementById('directionsList'));
                  //     $scope.directions.showList = true;
                  //     $scope.distance = response.routes[0].legs[0].distance.text;
                  //     $scope.travelTime = response.routes[0].legs[0].duration.text;
                  //   } else {
                  //     $scope.message = "Google route unsuccessful!";
                  //   }
                  // });


            //     };
            // });
            $scope.displayCategory = function (currentCategory){
              console.log('adding 1');
              console.log(currentCategory);
              // $state.go('results', {venue: currentCategory});
            };

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