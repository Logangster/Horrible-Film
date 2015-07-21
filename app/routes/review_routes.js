module.exports = function(express, app) {
	var router = express.Router();
	var Review = app.get('models').review;
	var User = app.get('models').user;
	var authenticate = require('../middleware/user_middleware').authenticate;
	
    //router.use(authenticate);
    
	router.route('/reviews')
	
		.get(authenticate, function(req, res) {
			//Retrieve all reviews and include the user that owns each review
			//TODO: Add films and create yet another foreign key to a film model
			Review.findAll({ order: [['createdAt', 'DESC']], include:[{ model: User }] }).then(function(reviews) {
				res.json(reviews);
			})
		})
		
		.post(authenticate, function(req, res) {
			User.findOne({ where: { userName: req.decoded.userName } }).then(function(user) {
				
				//Set the params to include the user id for the foreign key
				var reviewParams = req.body;
				reviewParams.userId = user.id;
				
				//Create review and return if successful
				Review.create(reviewParams).then(function(review) {
					if (review != null)
						res.json(review);
					else
						res.json({success: false});
				});
			});
		});
		
	return router;
}