(function() {
  var restaurantService = function($http){
    var getRestaurants = function(){
      return $http.get("/api/restaurants")
                  .then(function(res){
                    return res.data;
                  });
    };
    return {
      getRestaurants: getRestaurants
    };
  };
  angular
      .module("eatApp")
      .factory("restaurantService", restaurantService);
}());