// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function (){
  var app = angular.module('eatApp', ['ionic', 'ngResource']);

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
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: '../templates/default.html'
      })
      .state('fetch', {
        url: '/fetch',
        templateUrl: '../templates/fetch.html',
        controller: 'goFetchController'
      })
      .state('help-me', {
        url: '/help-me',
        templateUrl: '../templates/help-me.html'
      })
      .state('fetch.results', {
        templateUrl: '../templates/results.html'
      });

    $urlRouterProvider.otherwise('/');
  }]);
})();