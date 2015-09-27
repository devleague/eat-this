(function (){
  angular.module('eatApp')
    .controller('resultsController', [
        '$rootScope',
        '$scope',
        'eatTitle',
        'VenueService',
        '$stateParams',
        '$state',
        'uiGmapGoogleMapApi',
        finalResults
      ]);

  function finalResults ($rootScope, $scope, eatTitle, VenueService, $stateParams, $state, googleMaps) {
    $scope.title = eatTitle;
    $scope.byline = 'This is the final results';

    // if ($stateParams.venue === null){
    //   $state.go('home');
    // }

    // VenueService
    //   .displayVenue($stateParams.venue.id)
    //   .then(function(venue) {
    //     $scope.venue = venue;

    //     //Load maps
    //     googleMaps
    //       .then(function(maps){
    //         var origin = $stateParams.venue.directions.request.origin;
    //         convertToIntArr(origin);

    //         var latlng = new maps.LatLng(origin[0], origin[1]);
    //         var map = new maps.Map(document.getElementById('map_canvas'), {
    //           zoom: 15,
    //           center: latlng,
    //           control: {}
    //         });

    //         var directionsDisplay = new maps.DirectionsRenderer();
    //         directionsDisplay.setMap(map);
    //         directionsDisplay.setDirections($stateParams.venue.directions);
    //         directionsDisplay.setPanel(document.getElementById('directionsList'));
    //       });
    //   }, function(reason){
    //     $scope.message = "Could not be determined";
    //   });
  }
})();

function convertToIntArr(str){
  str = str.split(",");
  for (var i = 0; i < str.length; i++){
    str[i] = parseInt(str[i]);
  }
}