(function (){
  angular.module('eatApp')
    .controller('resultsController', [
        '$scope',
        'VenueService',
        '$stateParams',
        '$state',
        'uiGmapGoogleMapApi',
        'uiGmapIsReady',
        finalResults
      ]);

  function finalResults ($scope, VenueService, $stateParams, $state, googleMaps, uiGmapIsReady) {
    if ($stateParams.venue === null){
      $state.go('home');
    }

    $scope.venue = $stateParams.venue;

    var cuisine = [];
    $stateParams.venue.categories.forEach(function(category){
      cuisine.push(category[0]);
    });
    cuisine = cuisine.join(', ');
    $scope.cuisine = cuisine;
    $scope.duration = $stateParams.venue.directions.routes[0].legs[0].duration.text;
    $scope.distance = $stateParams.venue.directions.routes[0].legs[0].distance.text;

    //Load maps
    googleMaps
      .then(function(maps){
        var origin = $stateParams.venue.directions.request.origin;
        convertToIntArr(origin);

        $scope.map = {
          zoom: 15,
          center: {
            latitude: origin[0],
            longitude: origin[1]
          },
          control: {},
          options: {disableDefaultUI: true}
        };

        var directionsService = new maps.DirectionsService();
        var directionsDisplay = new maps.DirectionsRenderer();

        uiGmapIsReady.promise(1)
          .then(function(map_instances){
            var map = map_instances[0].map;
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections($stateParams.venue.directions);
          });
      });
    }
})();

function convertToIntArr(str){
  str = str.split(",");
  for (var i = 0; i < str.length; i++){
    str[i] = parseInt(str[i]);
  }
}