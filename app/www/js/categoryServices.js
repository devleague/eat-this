(function (){
  angular
    .module('eatApp')
    .service('CategoryService', ['$resource', '$http' , function ($resource, $http){

      var BASE_URL = 'http://localhost:8080';

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