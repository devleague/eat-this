(function (){
  angular
    .module('eatApp')
    .service('CategoryService', ['$resource' , function ($resource){

      this.getCategories = function (){

        return displayObjectArray;
      };

      this.displayCategory = function (catId){

        var Category = displayObjectArray;
        return Category.get().$promise;
      };

    }]);
})();