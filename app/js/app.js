(function (){
<<<<<<< HEAD
  var app = angular.module('eatApp', ['ui.router']);
=======
  var app = angular.module('eatApp', ['ui.router', 'ngResource', 'uiGmapgoogle-maps']);
>>>>>>> development

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