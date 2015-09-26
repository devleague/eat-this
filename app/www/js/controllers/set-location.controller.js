(function (){
  angular.module('eatApp')
    .controller('setLocationController', [
        '$rootScope',
        '$scope',
         setLocationController
      ]);

  function setLocationController ($rootScope, $scope) {
    $scope.place = null
  }
})();
