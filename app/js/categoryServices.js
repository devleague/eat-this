(function (){
  angular
    .module('eatApp')
    .service('CategoryService', ['$resource' , function ($resource){

      // this.getCategories = function (){

      //   //var catOptions = {}

      //   var categoryDataBase = $resource('/server/seed/categories.json');
      //   return categoryDataBase.query().$promise;
      // };

      // this.displayCategory = function (cat){

      //   var Category = $resource('/api/restaurants/:category', { category: cat });
      //   return Category.get().$promise;
      // };

    }]);
})();