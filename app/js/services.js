(function (){
  angular
    .module('eatApp')
    .service('VenueService', ['$resource' , function ($resource){

      this.getVenues = function (latitude, longitude, radius){
        radius = radius || 3220; //approx. 2 miles

        var queryOptions = {
          latitude: latitude,
          longitude: longitude,
          radius: radius
        };

        var Venues = $resource('/api/venues', queryOptions);

        return Venues.query().$promise;
      };

      this.displayVenue = function (venueId){

        var Venue = $resource('/api/venues/:id', { id: venueId });
        return Venue.get().$promise;
      };


    }]);
})();