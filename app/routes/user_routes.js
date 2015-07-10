module.exports = function(express, app) {
	
	var bcrypt = require('bcrypt-nodejs');
	var router = express.Router();
	var User = app.get('models').User;
	var Profile = app.get('models').Profile;
	var jwt    = require('jsonwebtoken');
	var config = require('../../config');
	var userMiddleware = require('../middleware/user_middleware');
	

	
	router.post('/authenticate', function(req, res) {
		//Find user to authenticate by userName
		User.find({ where: { userName: req.body.userName } }).then(function(user) {
			
			//Check if user exists
			if (user == null)
				return res.json({success:false});
			
			//Compare passwords
			var matches = bcrypt.compareSync(req.body.password, user.password);
			if (matches) {
				
				//Sign a token to send back to user since authentication was successful
				var token = jwt.sign({
					userName: user.userName,
				}, config.secret, {
					expiresInMinutes: 1440
				});

				return res.json({success: true, token: token});
			}
			else
				return res.json({success: false});	
		});
	});
	
	router.route('/users')
	
		// Get all users
		.get(function(req, res) {
			User.findAll()
			.then(
				function(users) {
					return res.json(users);		
				},
				function(err) {
					return res.json(err);
				}
			);
		})
		
		// Create new user
		.post(function(req, res) {
			
			User.create(req.body)
			.then(function(user) {
				
				//Create a blank profile for the user upon registration(prone to change)
				Profile.create({aboutMe: 'test', favoriteFilms: '', links: ''})
				.then(function(profile) {
					user.setProfile(profile);
				});
				
				return res.json(user);
			},
			function(err) {
				return res.json({success: false});
			});
		})
		
	router.route('/users/:user_name')
	
		// Get user by userName and also include their profile
		.get(userMiddleware.authenticate, function(req, res) {
			User.findOne({ 
				where: { userName: req.params.user_name },
				include:[{ model: Profile}] 
			})
			.then(function(user) {
				if (user != null) {
					return res.json(user);
				} else {
					return res.json({ error: "Couldn't find user." });
				}
			});
		})
		
		.put(userMiddleware.authenticate, function(req, res) {
			
			User.findOne({ 
				where: { userName: req.params.user_name },
				include:[{ model: Profile}]  
			})
			.then(function(user) {
				
				if (user != null) {
					// Make sure we only update fields that aren't empty
					if (req.body.aboutMe) user.Profile.aboutMe = req.body.aboutMe;
					if (req.body.favoriteFilms) user.Profile.favoriteFilms = req.body.favoriteFilms;
					if (req.body.links) user.Profile.links = req.body.links;
					
					user.Profile.save();
					
					return res.json({success: true});
					
				} else {
					return res.json({success: false, error: "Couldn't find user."});
				}
			});
		})
		
		// Remove user by userName
		.delete(userMiddleware.authenticate,function(req, res) {
			
			//Make sure users can only delete themselves
			if (!req.decoded || req.decoded.userName !== req.params.user_name)
				return res.status(403).send({success: false});
				
			User.destroy({ where: { userName: req.params.user_name } })
			.then(function(user) {
				return res.json({success: true});
			}, function(err) {
				return res.json(err);
			});
		});
			
		
	//Get the current user based off of a token 
	router.get('/me', userMiddleware.authenticate, function(req, res) {
		return res.json(req.decoded);
	});
		
	return router;
};