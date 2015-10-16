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
    $scope.markers = [];

    if($rootScope.selectedLocation){
      loadVenues($rootScope.selectedLocation);
    } else {
      $rootScope.userLocation
        .then(function(position){
          loadVenues(position);
        })
        .catch(function(error){
          $rootScope.$emit('openModal');
        });
    }

    $scope.openModal = function (){
      $rootScope.$emit('openModal');
    };

    function loadVenues(position) {
      $scope.position = true;
      googleMaps
        .then(function(maps){
          var latlng = new maps.LatLng(position.coords.latitude, position.coords.longitude);
          var map = new maps.Map(document.getElementById('map_canvas'), {
            zoom: 15,
            center: latlng,
            control: {}
          });

          VenueService
            .getVenues(position.coords.latitude, position.coords.longitude)
            .then(function(venues){
              if(venues.length !== 0){
                var markers=[];
                for (var i = 0; i < venues.length; i++){
                  createMarker(markers, venues[i].location.coordinate.latitude, venues[i].location.coordinate.longitude, i);
                }
                $scope.markers = markers;
              } else {
                showAlert();
              }
          })
          .catch(function(error){
            showAlert();
          });
        });
    }

    function showAlert(){
      var myPopup = $ionicPopup.alert({
        title: '<b>UH OH!</b>',
        template: 'Sorry. Our app does not work in your current location yet. Please select another location.',
      });
      myPopup.then(function(res){
        myPopup.close();
        return $rootScope.$emit('openModal');
      });
    }

    function createMarker (arr, x, y, id) {
      var marker = {
        latitude: x,
        longitude: y,
        id: id
      };
      arr.push(marker);
    }

  }
})();