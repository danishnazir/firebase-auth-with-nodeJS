var Firebase = require('firebase');
var admin = require("firebase-admin");
var ServiceAccount=("firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(ServiceAccount),
  databaseURL: ""
});
var config =("firebase_config.json");
Firebase.initializeApp(config);
 
function addUser(email, password, callback) {
admin.auth().createUser({
  email: email,
  password: password
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
  });
}


function authenticate(email, password, callback) {
	console.log(email);
	console.log(password);
	Firebase.auth().signInWithEmailAndPassword(email,password).
	then(function(userRecord)
		{
			console.log(userRecord.uid);
			callback(true);

		}).catch(function(error)
		{
			console.log(error);
			callback(false);
		});

}

module.exports = {

	addUser : addUser,
	authenticate : authenticate

}