(function (){
  angular.module('eatApp')
    .controller('resultsController', [
        '$scope',
        'eatTitle',
        'VenueService',
        '$stateParams',
        finalResults
      ]);

  function finalResults ($scope, eatTitle, VenueService, $stateParams) {
    $scope.title = eatTitle;
    $scope.byline = 'This is the final results';

    $scope.venue = $stateParams.venue;

    VenueService.displayVenue('andys-sandwiches-and-smoothies-honolulu')
      .then(function(result) {
        console.log(result);
        $scope.rating = result.rating;
        $scope.name = result.name;
        $scope.display_phone = result.display_phone;
        $scope.image = result.image_url;
      });
  }
})();