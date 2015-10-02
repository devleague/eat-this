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

    $scope.openModal = function (){
      $rootScope.$emit('openModal');
    };

    $rootScope.userLocation
      .then(function (position){
        $scope.position = position;
        console.log(position);
      })
      .catch(function(error){
        console.log(error);
        $rootScope.$emit('openModal');
      });
  }
})();