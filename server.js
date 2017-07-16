var express = require('express'),
app = express();
var bodyParser = require('body-parser');
var userService = require('./user_service');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Create new user
app.post('/user', function(req, res) {

	var newUserEmail = req.body.email;
	var newUserPass = req.body.password;

	userService.addUser(newUserEmail, newUserPass, 
		
		function(response) {
		
			if (response) {
				return res.send('Error when creating user');
			
			} else {			
				return res.send("Successfully created user");
		}
	});
});

//Perform authentication
app.post('/login', function(req, res){

	var userEmail = req.body.email;
	var userPassword = req.body.password;

	userService.authenticate(userEmail, userPassword,

		function(response) {

			if (response) {
				return res.send("Authorized");
			
			} else {
				return res.send("UnAuthorized");
		}

	});
});

app.listen(process.env.PORT || 3000,process.env.IP, function(){
	console.log('Server running at 3000');
});