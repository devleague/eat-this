(function (){
  angular
    .module('eatApp')
    .service('CategoryService', ['$resources', function ($resources){

      this.getCategory = function (){
        //var queryOptions = {

        //};

        var Categories = $resource('/api/restaurants', queryOptions);
        return Categories.query().$promise;
      };

      this.displayCategory = function (cat){

        var Category = $resource('/api/restaurants/:category', { category: cat });
        console.log(Category.get().$promise);
        return Category.get().$promise;

      };

    }])
    .service('VenueService', ['$resource' , function ($resource){

      this.getVenues = function (latitude, longitude, radius){
        radius = radius || 3220; //approx. 2 miles

        var queryOptions = {
          latitude: latitude,
          longitude: longitude,
          radius: radius
        };

        var Venues = $resource('/api/venues', queryOptions);

        return Venues.query().$promise;
      }]);
})();