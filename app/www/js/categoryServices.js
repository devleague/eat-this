(function (){
  angular
    .module('eatApp')
    .service('CategoryService', ['$resource', 'BASE_URL', '$http' , function ($resource, BASE_URL, $http){

      var BASE_URL = BASE_URL;

      this.getCategories = function () {

        var Categories = $resource(BASE_URL + "/api/restaurants");

        return Categories.query().$promise;

      };

      // this.displayCategory = function (catId){

      //   var Category = displayObjectArray;
      //   return Category.get().$promise;
      // };

    }]);
})();