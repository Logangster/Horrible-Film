module.exports = function(express, app) {
	
	var bcrypt = require('bcrypt-nodejs');
	var router = express.Router();
	var User = app.get('models').user;
	var profile = app.get('models').profile;
	var jwt    = require('jsonwebtoken');
	var userMiddleware = require('../middleware/user_middleware');
	
	/*
	 * Authenticate the user and return their json web token
	 */
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
					userID:	  user.id,
					userName: user.userName,
				}, process.env.secret || 'supersecret', {
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
			User.findAll({ order: [['createdAt', 'DESC']]})
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
				profile.create({aboutMe: 'test', favoriteFilms: '', links: ''})
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
				include:[{ model: profile}] 
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
			//Make sure users can only edit themselves
			if (!req.decoded || req.decoded.userName !== req.params.user_name)
				return res.status(401).send({success: false});
			
			User.findOne({ 
				where: { userName: req.params.user_name },
				include:[{ model: profile}]  
			})
			.then(function(user) {
				
				if (user != null) {
					// Make sure we only update fields that aren't empty
					if (req.body.aboutMe) user.profile.aboutMe = req.body.aboutMe;
					if (req.body.favoriteFilms) user.profile.favoriteFilms = req.body.favoriteFilms;
					if (req.body.links) user.profile.links = req.body.links;
					
					user.profile.save();
					
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
				return res.status(401).send({success: false});
				
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