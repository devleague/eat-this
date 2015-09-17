(function (){
  var app = angular.module('eatApp', ['ui.router', 'ngResource', 'uiGmapgoogle-maps', 'ngTouch']);

  app
  .config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider){
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
        controller: 'resultsController',
        params: {venue: null}
      });
  }])

  .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          // key: 'your api key',
          v: '3.21', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  });
})();