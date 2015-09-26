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
                        "secondary_image": dataImage2,
                        "used_image": null
                      });
                    }
                  }

                }
                $scope.displayObjectArray = displayObjectArray;
                $scope.currentCategory = displayObjectArray.shift();
                $scope.categoryImage = $scope.currentCategory.primary_image;
                $scope.currentCategory.used_image = $scope.categoryImage;
              });

          });

            //     //swipe left, new venue
            var leftSwipeArray = [];
            var rightSwipeArray = [];
            var usedImage, index, obj;


            $scope.leftSwipeShift = function(displayObjectArray){

              leftSwipeArray.push($scope.currentCategory);
              $scope.currentCategory = displayObjectArray.shift();
              console.log(leftSwipeArray, "left");
              for (var s = 0; s < leftSwipeArray.length; s++){

                if ($scope.currentCategory.primary_image === leftSwipeArray[s].used_image){
                $scope.categoryImage = $scope.currentCategory.secondary_image;


                } else if ($scope.currentCategory.secondary_image === leftSwipeArray[s].used_image){


                }
                $scope.currentCategory.used_image = $scope.categoryImage;


              }

            }

            $scope.rightSwipeShift = function (displayObjectArray){
              rightSwipeArray.push($scope.currentCategory);
              $scope.currentCategory = displayObjectArray.shift();
              console.log(rightSwipeArray, "right");
              //console.log(usedImage);
              if ($scope.currentCategory.primary_image === usedImage){
                $scope.categoryImage = $scope.currentCategory.secondary_image;
              } else {
                $scope.categoryImage = $scope.currentCategory.primary_image;
              }

              // for (var s = 0; s < rightSwipeArray.length; s++){

              //   if ($scope.currentCategory.primary_image === rightSwipeArray[s].primary_image){
              //     $scope.categoryImage = $scope.currentCategory.secondary_image;

              //   } else if ($scope.currentCategory.secondary_image === rightSwipeArray[s].secondary_image){

              //   }
              // }


            }


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