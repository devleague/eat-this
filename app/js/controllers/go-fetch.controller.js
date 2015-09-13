var deniedVenues = [];

(function (){
  angular.module('eatApp')
    .controller('goFetchController', [
        '$scope',
        'eatTitle',
        'Geolocator',
        'VenueService',
        '$state',
        goFetch
      ]);

  function goFetch ($scope, eatTitle, geolocation, VenueService, $state) {

    $scope.title = eatTitle;
    $scope.byline = 'LETS FETCH SOMETHING AWESOME';
    $scope.message = "Determining your location...";

    $scope.currentVenue;

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
          .then(function(venues){

            $scope.venues = venues;

            $scope.currentVenue = venues.shift();

          });
      });

    $scope.getVenue = function(venues){
      console.log('YOU ARE SWIPING LEFT');

      deniedVenues.push($scope.currentVenue);
      $scope.currentVenue = venues.shift();
      console.log(deniedVenues);
    };

    $scope.displayVenue = function (currentVenue){
      console.log('displaying venue');
      console.log(currentVenue);
      // $state.go('results');
    };

  }
})();

function createMarker ($scope, x, y) {
  var marker = new google.maps.Marker({
    map: $scope.map,
    position: new google.maps.LatLng(x, y)
  });
  $scope.markers.push(marker);
}