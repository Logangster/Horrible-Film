module.exports = function(express, app) {
	var router = express.Router();
	var Review = app.get('models').Review;
	var authenticate = require('../middleware/user_middleware').authenticate;
	
    //router.use(authenticate);
    
	router.route('/reviews')
	
		.get(authenticate, function(req, res) {
			res.send('hello from reviews');
		});
		
	return router;
}