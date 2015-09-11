(function (){
  var app = angular.module('eatApp', ['ui.router', 'ngResource']);

  app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider
      .otherwise('/');
    $stateProvider
      .state('home', {
<<<<<<< HEAD
        url: '/'
=======
        url: '/',
        templateUrl: '../templates/default.html'
>>>>>>> development
      })
      .state('fetch', {
        url: '/fetch',
        templateUrl: '../templates/go-fetch.html',
        controller: 'goFetchController'
      })
      .state('results', {
        url: '/results',
        templateUrl: '../templates/results.html',
        controller: 'resultsController'
      });
  }]);

})();