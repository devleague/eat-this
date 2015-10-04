(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        '$state',
        'eatTitle',
        'Geolocator',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, $state, eatTitle, geolocation, googleMaps) {
    $scope.title = eatTitle;

    $scope.place = null;

    $rootScope.userLocation
      .then(function (position){
        $scope.position = position;
        googleMaps
        .then(function(maps){
          console.log(maps);
          var geocoder = new maps.Geocoder();
          var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
          geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              if (results[1]) {
                console.log(results);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
        });
      })
      .catch(function(error){
        console.log(error);
        $rootScope.$emit('openModal');
      });
  }
})();