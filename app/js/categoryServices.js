(function (){
  angular
    .module('eatApp')
    .service('CategoryService', ['$resource' , function ($resource){

      this.getCategory = function (QQ){

      };

      this.displayCategory = function (cat){

        var Category = $resource('/api/restaurants/:category', { category: cat });
        return Category.get().$promise;
      };

    }]);
})();