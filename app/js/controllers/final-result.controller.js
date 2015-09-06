(function (){
  angular.module('eatApp')
    .controller('resultsController', [
        '$scope',
        'eatTitle',
        'VenueService',
        finalResults
      ]);

  function finalResults ($scope, eatTitle, VenueService) {
    $scope.title = eatTitle;
    $scope.byline = 'This is the final results';
    $scope.returnVenue = VenueService.getVenues();
  }
})();