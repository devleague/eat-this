(function (){
  var app = angular.module('eatApp', ['ui.router']);

  app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider
      .otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '../templates/default.html'
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