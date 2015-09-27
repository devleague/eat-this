(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        '$ionicModal',
        'eatTitle',
        'Geolocator',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, $ionicModal, eatTitle, geolocation, googleMaps) {
    $scope.title = eatTitle;
    $scope.place = null;

    // $ionicModal
    //   .fromTemplateUrl('templates/set-location.html', {
    //     scope: $scope,
    //     animation: 'slide-in-up'
    //   })
    //   .then(function(modal){
    //     $scope.modal = modal;
    //   })

    // $scope.openModal = function(){
    //   $scope.modal.show();
    // }

    // $scope.closeModal = function(){
    //   $scope.modal.hide();
    // }

    // $scope.$on('destroy', function(){
    //   $scope.modal.remove();
    // })

    $rootScope.userLocation
      .then(function (position){
        $scope.position = position;
        console.log(position);
      }, function(reason){
        $scope.message = reason.message;
      }), function(reason){
          $scope.message = "Could not be determined";
      };
  }
})();
