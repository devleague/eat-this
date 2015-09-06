(function (){
  angular.module('eatApp')
    .controller('resultsController', [
        '$scope',
        'eatTitle',
        finalResults
      ]);

  function finalResults ($scope, eatTitle) {
    $scope.title = eatTitle;
    $scope.byline = 'This is the final results';
  }
})();