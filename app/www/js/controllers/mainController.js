(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        'eatTitle',
        'Geolocator',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, eatTitle, geolocation, googleMaps) {
    $scope.title = eatTitle;

    geolocation()
      .then(function (position){
        $scope.position = position;
        $scope.location = position.coords.latitude;
      }, function(reason){
        $scope.message = reason.message;

        googleMaps
          .then(function(maps){
            var placeSearch, autocomplete;
            console.log(maps);

            function initAutocomplete(){
              autocomplete = new maps.places.Autocomplete((document.getElementById('autocomplete')), {types: ['geocode']});
              autocomplete.addListener('place_changed', fillInAddress);
            }
          });
      });
  }
})();
