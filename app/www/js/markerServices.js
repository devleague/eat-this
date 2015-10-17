(function(){
  angular
    .module('eatApp')
    .factory('counter', function(){
      return {
        count: 1,
        incrementCount: function(){
          this.count++;
          return this.count;
        }
      };
    });
})();