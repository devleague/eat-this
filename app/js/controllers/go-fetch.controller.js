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
    // $scope.genericVar = 0;
    // $scope.back = function (){
    //   $scope.genericVar--;
    // };
    // $scope.next = function (){
    //   $scope.genericVar++;
    // };

    $scope.title = eatTitle;
    $scope.byline = 'LETS FETCH SOMETHING AWESOME';
    $scope.message = "Determining your location...";

    geolocation().then(function(position){
      $scope.position = position;
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;

      var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      };

      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      $scope.markers = [];
      createMarker($scope, position.coords.latitude, position.coords.longitude);

    }, function(reason){
      $scope.message = "Could not be determined";
    })
    .then(function() {
      VenueService.getVenues($scope.latitude, $scope.longitude);
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
