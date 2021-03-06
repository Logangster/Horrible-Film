module.exports = function(express, app) {
	var router = express.Router();
	var Review = app.get('models').review;
	var User = app.get('models').user;
	var Film = app.get('models').film;
	var authenticate = require('../middleware/user_middleware').authenticate;
	
    //router.use(authenticate);
    
	router.route('/reviews')
	
		.get(function(req, res) {
			//Retrieve all reviews and include the user that owns each review
			//TODO: Add films and create yet another foreign key to a film model			
			Review.findAll({ order: [['createdAt', 'DESC']], include:[{ model: User }, { model: Film }] }).then(function(reviews) {
				res.json(reviews);
			})
		})
		
		.post(authenticate, function(req, res) {
			User.findOne({ where: { userName: req.decoded.userName } }).then(function(user) {		

				//Set the params to include the user id for the foreign key
				var reviewParams = req.body;
				reviewParams.userId = user.id;
				
				//Create a film database entry if the film doesn't already exist in the database
				Film.findOrCreate({ 
					where: { 
						filmTitle: { $iLike: req.body.filmTitle }
					},
					defaults: { filmTitle: req.body.filmTitle }
				}).then(function(film) {
					reviewParams.filmId = film[0].id;
					
				 //Create review and return if successful
					Review.create(reviewParams).then(function(review) {
						if (review != null)
							res.json(review);
						else
							res.json({success: false});
					});
							
				});
			});
		});
		
		router.route('/reviews/:id')
		
			.get(function(req, res) {
				Review.findOne({ 
					where: { id: req.params.id }, 
					include: [{ model: Film }, { model: User }]
				}).then(function(review) {
					if (review != null)
						return res.json(review);
					else
						return res.json({success:false});
				})
			})
		
	return router;
}