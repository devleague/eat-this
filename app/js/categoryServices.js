(function (){
  angular
    .module('eatApp')
    .service('CategoryService', ['$resource' , function ($resource){

      // this.getCategory = function (QQ){

      //   var catOptions =

      //   var Category = $resources('/api/restaurants', catOptions);
      //   return Category.query().$promise;
      // };

      this.displayCategory = function (cat){

        var Category = $resource('/api/restaurants/:category', { category: cat });
        return Category.get().$promise;
      };

    }]);
})();