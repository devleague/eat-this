(function (){
  angular.module('eatApp')
    .controller('helpMeController', [
        '$scope',
        'eatTitle',
        '$http',
        getRestaurantsByCategory
      ]);

  function getRestaurantsByCategory ($scope, eatTitle, $http) {
    $scope.title = eatTitle;
    $scope.byline = 'LETS GET SOMETHING TO EAT';

    return $http.get("/api/restaurants")
                .then(function(res){
                  $scope.res = res.data;
                  return $scope.res;
                });
  }
})();

