(function (){
  var LOCAL = 'localhost';
  var IP = '';
  angular
    .module('eatApp')
    .value('BASE_URL', 'http://' + LOCAL + ':8080');
})();