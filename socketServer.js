/*
 * Simple socket server for pub/sub using socket.io
 */
 
module.exports = function(http) {
	
	var io = require('socket.io')(http);
	
	io.on('connection', function(socket) {
		socket.on('user:new', function(data) {
			console.log(data);
			io.emit('user:new', 'new user');
		});
	});
}