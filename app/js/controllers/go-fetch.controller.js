(function (){
  angular.module('eatApp')
    .controller('goFetchController', [
        '$scope',
        'eatTitle',
        'Geolocator',
        'VenueService',
        goFetch
      ]);

  function goFetch ($scope, eatTitle, geolocation, VenueService) {
    $scope.title = eatTitle;
    $scope.byline = 'LETS FETCH SOMETHING AWESOME';
    $scope.message = "Determining your location...";
    geolocation().then(function(position){
      $scope.position = position;
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
    }, function(reason){
      $scope.message = "Could not be determined";
    })
    .then(function() {
      VenueService.getVenues($scope.latitude, $scope.longitude);
    });
  }
})();