(function (){
  angular
    .module('eatApp')
    .service('VenueService', ['$resource' , function ($resource){

      var BASE_URL = 'http://localhost:8080';

      this.getVenues = function (latitude, longitude, radius){
        radius = radius || 3220; //approx. 2 miles

        var queryOptions = {
          latitude: latitude,
          longitude: longitude,
          radius: radius
        };

        var Venues = $resource(BASE_URL + '/api/venues', queryOptions);

        return Venues.query().$promise;
      };

      this.displayVenue = function (venueId){
        var Venue = $resource(BASE_URL + '/api/venues/:id', { id: venueId });
        return Venue.get().$promise;
      };

    }]);
})();