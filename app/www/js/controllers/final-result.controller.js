(function (){
  angular.module('eatApp')
    .controller('resultsController', [
        '$rootScope',
        '$scope',
        'VenueService',
        '$stateParams',
        '$state',
        'uiGmapGoogleMapApi',
        finalResults
      ]);

  function finalResults ($rootScope, $scope, VenueService, $stateParams, $state, googleMaps) {
    $scope.byline = 'This is the final results';
    if ($stateParams.venue === null){
      $state.go('home');
    }

    $scope.venue = $stateParams.venue;

    VenueService
      .displayVenue($stateParams.venue.id)
      .then(function(venue) {
        $scope.venue = venue;

        var cuisine = [];
        venue.categories.forEach(function(category){
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

            var latlng = new maps.LatLng(origin[0], origin[1]);
            var map = new maps.Map(document.getElementById('venue_directions'), {
              zoom: 15,
              center: latlng,
              control: {}
            });

            var directionsService = new maps.DirectionsService();
            var directionsDisplay = new maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections($stateParams.venue.directions);
          });
      }, function(reason){
        $scope.message = "Could not be determined";
      });
  }
})();

function convertToIntArr(str){
  str = str.split(",");
  for (var i = 0; i < str.length; i++){
    str[i] = parseInt(str[i]);
  }
}