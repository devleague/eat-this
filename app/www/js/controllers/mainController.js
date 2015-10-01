(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        '$state',
        '$ionicModal',
        'eatTitle',
        'Geolocator',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, $state, $ionicModal, eatTitle, geolocation, googleMaps) {
    $scope.title = eatTitle;

    $scope.place = null;

    $rootScope.userLocation
      .then(function (position){
        $scope.position = position;
        console.log(position);
      })
      .catch(function(error){
        console.log(error);
        $scope.modal.show();

      });

    $ionicModal
      .fromTemplateUrl('templates/set-location.html', {
        scope: $scope,
        anmiation: 'slide-in-up'
      })
      .then(function (modal){
        $scope.modal = modal;
      });
  }
})();