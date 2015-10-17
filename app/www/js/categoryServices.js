(function (){
  angular
    .module('eatApp')
    .service('CategoryService', ['$resource', 'BASE_URL', '$http' , function ($resource, BASE_URL, $http){

      var BASE_URL = BASE_URL;

      this.getCategories = function () {

        var Categories = $resource(BASE_URL + "/api/restaurants");
        //change to img file

        return Categories.query().$promise;

      };

      this.displayRestaurant = function (object){

        var Category = displayObjectArray;
        return Category.get().$promise;
      };

    }]);
})();