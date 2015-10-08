(function (){
  angular.module('eatApp')
    .controller('mainController', [
        '$rootScope',
        '$scope',
        '$state',
        '$ionicPopup',
        'VenueService',
        'Geolocator',
        'uiGmapGoogleMapApi',
         mainController
      ]);

  function mainController ($rootScope, $scope, $state, $ionicPopup, VenueService, geolocation, googleMaps) {

    $scope.place = null;

    $rootScope.userLocation
      .then(function(position){
        loadVenues(position);
      })
      .catch(function(error){
        console.log(error);
        $rootScope.$emit('openModal');
      });

    $scope.openModal = function (){
      $rootScope.$emit('openModal');
    };

    function loadVenues(position) {
      $scope.position = true;
      VenueService
        .getVenues(position.coords.latitude, position.coords.longitude)
        .then(function(venues){
          $scope.showAlert = function (){
            var myPopup = $ionicPopup.alert({
              title: '<b>UH OH!</b>',
              template: 'Our app does not work in your location yet.',
              // scope: $scope,
              // buttons:[{
              //   text: 'Give Up Now' },
              //   {
              //   text: 'Set Another Location',
              //   type: 'button-positive',
              //   onTap: function() {
              //     myPopup.close();
              //     return $rootScope.$emit('openModal');
              //   }
              // }]
            });
            myPopup.then(function(res){
              if(res){
                console.log('You clicked Set Location!');
              } else {
                console.log('You gave up');
              }
            });
          };
          $scope.showAlert();

          // if(venues){
          //   googleMaps
          //   .then(function(maps){
          //     var geocoder = new maps.Geocoder();
          //     var latlng = {lat: parseFloat(position.coords.latitude), lng: parseFloat(position.coords.longitude)};
          //     geocoder.geocode({'location': latlng}, function(results, status) {
          //       if (status === google.maps.GeocoderStatus.OK) {
          //         if (results[1]) {
          //           $rootScope.userLocation.country = results[results.length - 1].formatted_address;
          //         } else {
          //           window.alert('No results found');
          //         }
          //       } else {
          //         window.alert('Geocoder failed due to: ' + status);
          //       }
          //     });
          //   });
          // } else {

          // }
        });
    }
  }
})();