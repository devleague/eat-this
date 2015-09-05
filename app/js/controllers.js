(function (){
  angular.module('eatApp')
    .controller('main', [
        '$scope',
        'eatTitle',
        mainController
      ]);

  function mainController ($scope, eatTitle) {
    $scope.title = eatTitle;
  }
})();