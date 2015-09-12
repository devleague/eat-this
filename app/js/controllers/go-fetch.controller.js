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

        //create map with user position as center
        $scope.map = { center: { latitude: position.coords.latitude, longitude: position.coords.longitude }, zoom: 15};

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
            venues.forEach(function(venue, index){
              var i = index + 1;
              createMarker(markers, venue.location.coordinate.latitude, venue.location.coordinate.longitude, i);
            });
            $scope.markers=markers;
          });
      });
  }
})();

function createMarker (arr, x, y, id, icon) {
  var marker = {
    latitude: x,
    longitude: y,
    id: id
  };
  arr.push(marker);
}