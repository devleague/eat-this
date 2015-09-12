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

    geolocation()
      .then(function(position){
        $scope.position = position;
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;

        $scope.map = { center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: 15};

        $scope.markers = [];
        createMarker($scope, position.coords.latitude, position.coords.longitude);

      }, function(reason){
        $scope.message = "Could not be determined";
      })
      .then(function() {
        VenueService
          .getVenues($scope.latitude, $scope.longitude)
          .then(function(result){
            $scope.sampleRestaurant = result[0].name;
          });
      });
  }
})();

function createMarker ($scope, x, y) {
  var marker = new google.maps.Marker({
    map: $scope.map,
    position: new google.maps.LatLng(x, y)
  });
  $scope.markers.push(marker);
}
