var jwt = require('jsonwebtoken');
var config = require('../../config');

module.exports = {
	//Authenticate if user has token
	authenticate: function authenticate (req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		
		if (token) {
			jwt.verify(token, config.secret, function(err, decoded) {
				//Token doesn't verify correctly
				if (err) {
					return res.status(403).send({success: false, message: "Token failed to authenticate"});
				//Valid token!
				} else {
					//Save the decoded user so that they may look themselves up later
					req.decoded = decoded;
					next();
				}
			});
		// No token provided
		} else {
			return res.status(403).send({success: false, message: 'No token provided'});
		}
	}
}