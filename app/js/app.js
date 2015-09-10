(function (){
  var app = angular.module('eatApp', ['ui.router', 'uiGmapgoogle-maps']);

  app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider
      .otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
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

//AIzaSyDbLzOyIWC2aEMSSquh19owcsp4GjaPVTU