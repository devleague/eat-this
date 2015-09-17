(function (){
  angular.module('eatApp')
    .controller('resultsController', [
        '$scope',
        'eatTitle',
        'VenueService',
        '$stateParams',
        '$state',
        finalResults
      ]);

  function finalResults ($scope, eatTitle, VenueService, $stateParams, $state) {
    $scope.title = eatTitle;
    $scope.byline = 'This is the final results';

    if ($stateParams.venue === null){
      $state.go('home');
    }

    VenueService.displayVenue($stateParams.venue.id)
      .then(function(venue) {
        console.log(venue);

        $scope.venue = venue;
      });
  }
})();