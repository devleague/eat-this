(function() {
  var restaurantService = function($http){
    var getRestaurants = function(){
      console.log($http.get("/api/restaurants"));
      return $http.get("/api/restaurants");
    };
    return getRestaurants();
  };
  angular
      .module("eatApp")
      .controller('helpMeController', [
        '$scope',
        '$http'
        ])
      .factory("restaurantService", restaurantService);


}());
