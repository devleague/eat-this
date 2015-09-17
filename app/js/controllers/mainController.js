(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$scope',
        'eatTitle',
         mainController
      ]);

  function mainController ($scope, eatTitle) {
    $scope.title = eatTitle;
  }
})();