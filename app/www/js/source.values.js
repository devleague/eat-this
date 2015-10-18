(function (){
  var LOCAL = 'localhost';
  var IP = 'eatthis.snakaz.com';
  angular
    .module('eatApp')
    .value('BASE_URL', 'http://' + IP + ':8080');
})();