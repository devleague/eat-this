// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

(function (){

  var app = angular.module('eatApp', ['ionic', 'ngCordova', 'ngResource', 'uiGmapgoogle-maps']);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function(){
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
      if(ionic.Platform.isWebView()){
        console.log('is web broswer');
      }
      if(ionic.Platform.isIOS()){
        console.log('this is iOS');
      }
      if(ionic.Platform.isAndroid()){
        console.log('is android');
      }
      console.log(ionic.Platform.device());
    });
  });

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider ){
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'templates/default.html'
      })
      .state('fetch', {
        url: '/fetch',
        templateUrl: 'templates/fetch.html',
        controller: 'goFetchController'
      })
      .state('help-me', {
        url: '/help-me',
        templateUrl: 'templates/help-me.html',
        controller: 'helpMeController'
      })
      .state('results', {
        url: '/results',
        templateUrl: 'templates/results.html',
        controller: 'resultsController',
        params: {venue: null}
      });

    $urlRouterProvider.otherwise('/');
  }]);
  // .config(function(uiGmapGoogleMapApiProvider) {
  //   uiGmapGoogleMapApiProvider.configure({
  //       // key: 'your api key',
  //       v: '3.21', //defaults to latest 3.X anyhow
  //       libraries: 'weather,geometry,visualization'
  //   });
  // });

  app.run(function ($rootScope, Geolocator){
    $rootScope.userLocation = Geolocator();
  });

  // app.run(function ($rootScope, $cordovaGeolocation){
  //   var posOptions = {timeout: 10000, enableHighAccuracy: false};
  //   $cordovaGeolocation
  //     .getCurrentPosition(posOptions)
  //     .then(function (position) {
  //       var lat  = position.coords.latitude;
  //       var long = position.coords.longitude;
  //       $rootScope.mobileGeo = lat + ' & ' + long;
  //       console.log(lat + ' AND ' + long);
  //     }, function(err) {
  //       // error
  //     });
  // });
})();