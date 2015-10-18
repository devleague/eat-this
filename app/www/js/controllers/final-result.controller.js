(function (){
  angular.module('eatApp')
    .controller('resultsController', [
        '$scope',
        'VenueService',
        '$stateParams',
        '$state',
        'uiGmapGoogleMapApi',
        finalResults
      ]);

  function finalResults ($scope, VenueService, $stateParams, $state, googleMaps) {
    if ($stateParams.venue === null){
      $state.go('home');
    }

    $scope.venue = $stateParams.venue;

    $scope.goTo = function (url) {
      window.open(url,'_system');
    };

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

        var latlng = new maps.LatLng(origin[0], origin[1]);
        var map = new maps.Map(document.getElementById('venue_directions'), {
          zoom: 15,
          center: latlng,
          control: {},
          options: {disableDefaultUI: true}
        });

        var directionsService = new maps.DirectionsService();
        var directionsDisplay = new maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        directionsDisplay.setDirections($stateParams.venue.directions);
      });
    }

  function convertToIntArr(str){
    str = str.split(",");
    for (var i = 0; i < str.length; i++){
      str[i] = parseInt(str[i]);
    }
  }

})();
