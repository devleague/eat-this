// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function (){

  var app = angular.module(
    'eatApp',
    ['ionic',
    'ngResource',
    'ngCordova',
    'google.places',
    'uiGmapgoogle-maps'
  ]);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function(){
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider ){

    $stateProvider
      .state('app', {
        cache: false,
        url: '/',
        templateUrl: 'templates/default.html'
      })
      .state('fetch', {
        cache: false,
        url: '/fetch',
        templateUrl: 'templates/fetch.html',
        controller: 'goFetchController'
      })
      .state('help-me', {
        url: '/help-me',
        templateUrl: 'templates/help-me.html',
        controller: 'helpMeController'
      })
      .state('help-me.list', {
        templateUrl: 'templates/help-list.html',
        controller: 'helpMeListController'
      })
      .state('results', {
        url: '/results',
        templateUrl: 'templates/results.html',
        controller: 'resultsController',
        params: {venue: null}
      });

    $urlRouterProvider.otherwise('/');
  }]);

  app.run(function ($rootScope, Geolocator){
    $rootScope.userLocation = Geolocator();
  });

  app.run(function ($rootScope){
    $rootScope.$on('openModal', function (){
      $rootScope.$broadcast('showModal');
    });
  });

})();