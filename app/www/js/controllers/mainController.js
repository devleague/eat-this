(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        'eatTitle',
         mainController
      ]);

  function mainController ($rootScope, $scope, eatTitle, geolocation) {
    $scope.title = eatTitle;
  }
})();
