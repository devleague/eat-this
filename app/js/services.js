

(function (){
  angular
    .module('eatApp')
    .service('VenueService', ['$resource' , function ($resource){

      this.getVenues = function (lat, long, radius){
        radius = radius || 2;
        var queryOptions = {};

        // var Venues = $resource('/api/venues', queryOptions);

        var temp = testData();
        return getLargeImg(temp);

        // return Venues.get().$promise;
      };

      this.displayVenue = function (venue){

        var Venue = $resource('/api/venues', venue);
        return Venue.get().$promise;
      };


    }]);
})();


function getLargeImg (obj){
  var imgUrl = obj.image_url;
  obj.image_url = imgUrl.replace(/(\/ms\.jpg$)/g, "/o.jpg");
  console.log(obj);
  return obj;
}


function testData (){
  return {
    "is_claimed": true,
    "rating": 4.5,
    "mobile_url": "http://m.yelp.com/biz/andys-sandwiches-and-smoothies-honolulu",
    "rating_img_url": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png",
    "review_count": 348,
    "name": "Andy's Sandwiches & Smoothies",
    "snippet_image_url": "http://s3-media4.fl.yelpcdn.com/photo/oWkqzCIQSrelDQYDiqzwNA/ms.jpg",
    "rating_img_url_small": "http://s3-media2.fl.yelpcdn.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png",
    "url": "http://www.yelp.com/biz/andys-sandwiches-and-smoothies-honolulu",
    "menu_date_updated": 1441313569,
    "phone": "8089886161",
    "snippet_text": "Hot Turkey sandwich is amazing!!! Real turkey with cheese, tomatoes, lettuce, sprouts and papaya dressing. \n\nMy palate is refined...meaning I don't eat and...",
    "image_url": "http://s3-media3.fl.yelpcdn.com/bphoto/wvJRyHVmnJ7jxHmtxq1bPg/ms.jpg",
    "categories": [
      [
        "Vegetarian",
        "vegetarian"
      ],
      [
        "Vegan",
        "vegan"
      ],
      [
        "Sandwiches",
        "sandwiches"
      ]
    ],
    "display_phone": "+1-808-988-6161",
    "rating_img_url_large": "http://s3-media4.fl.yelpcdn.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png",
    "menu_provider": "single_platform",
    "id": "andys-sandwiches-and-smoothies-honolulu",
    "is_closed": false,
    "location": {
      "city": "Honolulu",
      "display_address": [
        "2904 E Manoa Rd",
        "Manoa",
        "Honolulu, HI 96822"
      ],
      "geo_accuracy": 9.5,
      "neighborhoods": [
        "Manoa"
      ],
      "postal_code": "96822",
      "country_code": "US",
      "address": [
        "2904 E Manoa Rd"
      ],
      "coordinate": {
        "latitude": 21.309936,
        "longitude": -157.810301
      },
      "state_code": "HI"
    }
  };
}