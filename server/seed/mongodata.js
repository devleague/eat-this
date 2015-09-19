var models = require('../models/Restaurants');

var Restaurant = models.Restaurant;

models.sequelize
  .sync({ force: true })
  .then(require('./categories'))
  .then(function() {
    for(var i = 0; i < 27; i++) {
      Restaurant.bulkCreate([
        { name: name,
          category: category,
          image: image
        }
      ]);
    }
  })
;