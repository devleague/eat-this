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

    VenueService.displayVenue('andys-sandwiches-and-smoothies-honolulu')
      .then(function(result) {
        $scope.rating = result.rating;
        $scope.name = result.name;
        $scope.display_phone = result.display_phone;
        $scope.image = result.image_url;
      });
  }
})();