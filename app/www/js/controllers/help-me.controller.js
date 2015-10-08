(function (){
  angular.module('eatApp')
    .controller('helpMeController', [
        '$rootScope',
        '$scope',
        'Geolocator',
        'CategoryService',
        'VenueService',
        '$state',
        'uiGmapGoogleMapApi',
        getRestaurantsByCategory
      ]);

  function getRestaurantsByCategory ($rootScope, $scope, geolocation, CategoryService, VenueService, $state, googleMaps) {
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
            //console.log(venues);
            $scope.venues = venues;
            //fetching keywords for help me function
            var foodCategories = [];
            var singleCategory, name, rating, phone;
            var categoryVenue;
            var categoryObject = {};

            for (var i = 0; i < venues.length; i++){

              for (var j = 0; j < venues[i].categories.length; j++){

                singleCategory = venues[i].categories[j][0];
                categoryVenue = venues[i].id;
                name = venues[i].name;
                rating = venues[i].rating;
                phone = venues[i].phone;
                image = venues[i].image_url

                  categoryObject = {
                  "category": singleCategory,
                  "venue" : categoryVenue,
                  "name": name,
                  "rating": rating,
                  "phone": phone,
                  "image": image
                };
                  foodCategories.push(categoryObject);


              }
            }

            runShuffle(foodCategories);

            $scope.foodCategories = foodCategories;

            // var resultsObject, resultsCategory, num;

            // function produceResult (rightSwipeArray){

            //   num = Math.floor(Math.random() * (rightSwipeArray.length));
            //   resultsObject = rightSwipeArray[num];

            //   //console.log(resultsObject);
            //   //return $scope.resultsCategory;
            //   // Send object to Route
            //   displayVenue = function (resultsObject){
            //     console.log(resultsObject.id);
            //     $state.go('results', {venue: resultsObject.id});
            //   }();
            // }

            // $scope.produceResult = produceResult;

          CategoryService
            .getCategories()
            .then(function (data){
                console.log(data);
                console.log($scope.venues);
                //loop through image array and check if is also present in other array
                var dataCat, dataImage1, dataImage2, venueCat, venueName;
                var displayObjectArray = [];

                for (var x = 0; x < data.length; x++){
                  dataCat = data[x].category;
                  dataImage1 = data[x].primary_image;
                  dataImage2 = data[x].secondary_image;

                  //hasOwnProperty function
                  for (var y = 0; y < foodCategories.length; y++){
                    venueCat = foodCategories[y].category;
                    venueName = foodCategories[y].venue;

                    if (dataCat === venueCat){
                      displayObjectArray.push({
                        "category": dataCat,
                        "venue": venueName,
                        "primary_image": dataImage1,
                        "secondary_image": dataImage2,
                        "used_image": null,
                        "count": 0
                      });
                    }
                  }

                }
                //need to shuffle array
                $scope.displayObjectArray = displayObjectArray;
                $scope.currentCategory = displayObjectArray.shift();
                $scope.categoryImage = $scope.currentCategory.primary_image;
                $scope.currentCategory.used_image = $scope.categoryImage;
                usedImage = $scope.currentCategory.used_image;
                //currentCategory is restaurant object with cat, venue, and images
              });

          });

            //swipe left, new venue
            var leftSwipeArray = [];
            var rightSwipeArray = [];
            var usedImage, index, obj;


            $scope.leftSwipeShift = function(displayObjectArray){
              if (displayObjectArray.length > 0){

                leftSwipeArray.push($scope.currentCategory);
                $scope.currentCategory = displayObjectArray.shift();
                //console.log(leftSwipeArray, "left");
                for (var s = 0; s < leftSwipeArray.length; s++){

                  if ($scope.currentCategory.primary_image === leftSwipeArray[s].used_image || usedImage === leftSwipeArray[s].used_image){
                    $scope.categoryImage = $scope.currentCategory.secondary_image;
                    $scope.currentCategory.used_image = $scope.categoryImage;
                    //console.log("first if");


                  } else if ($scope.currentCategory.secondary_image === leftSwipeArray[s].used_image){
                    leftSwipeArray.push($scope.currentCategory);
                      $scope.currentCategory = displayObjectArray.shift();
                      $scope.categoryImage = $scope.currentCategory.secondary_image;
                      $scope.currentCategory.used_image = $scope.categoryImage;
                      //console.log("second if");

                  } else {
                    $scope.categoryImage = $scope.currentCategory.primary_image;
                    $scope.currentCategory.used_image = $scope.categoryImage;
                    usedImage = $scope.currentCategory.used_image;
                  }
                }
              } else {

                produceResult(rightSwipeArray);
              }
            }

            $scope.rightSwipeShift = function (displayObjectArray){
              if (displayObjectArray.length > 0){

                //get complete $scope.venues info
                var aaa = $scope.currentCategory.venue;
                var bIndex = getIndexOfObjectWithAttribute($scope.venues, "id", aaa);
                var ccc = $scope.venues[bIndex];
                rightSwipeArray.push(ccc);

                $scope.currentCategory = displayObjectArray.shift();
                console.log(rightSwipeArray, "right");
                for (var t = 0; t < rightSwipeArray.length; t++){

                  if ($scope.currentCategory.primary_image === rightSwipeArray[t].used_image || usedImage === rightSwipeArray[t].used_image){
                    $scope.categoryImage = $scope.currentCategory.secondary_image;
                    $scope.currentCategory.used_image = $scope.categoryImage;
                    //console.log("first if");

                  } else if ($scope.currentCategory.secondary_image === rightSwipeArray[t].used_image){
                      leftSwipeArray.push($scope.currentCategory);
                      $scope.currentCategory = displayObjectArray.shift();
                      $scope.categoryImage = $scope.currentCategory.secondary_image;
                      $scope.currentCategory.used_image = $scope.categoryImage;
                      //console.log("second if");

                  } else {
                    $scope.categoryImage = $scope.currentCategory.primary_image;
                    $scope.currentCategory.used_image = $scope.categoryImage;
                    usedImage = $scope.currentCategory.used_image;
                  }
                }
              } else {
                produceResult(rightSwipeArray);
              }
            }


            var resultsObject, resultsCategory, num;

            function produceResult (rightSwipeArray){

              num = Math.floor(Math.random() * (rightSwipeArray.length));
              resultsObject = rightSwipeArray[num];

              console.log(resultsObject);
              //return $scope.resultsCategory;

              // Send object to Route
              // $scope.displayVenue = function (resultsObject){
              //   console.log("XXXX");
              //   $state.go('results', {venue: resultsObject.id});
              // }();
            }

          });


        };

})();

function getIndexOfObjectWithAttribute (array, attr, value){
  for (var m = 0; m < array.length; m++){
    if (array[m][attr] === value) {
            return m;
    }
  }
  return -1;
}


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