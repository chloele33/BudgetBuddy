(function()	{

	// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyCMEb5Ak3OPms4X_NGw1sUx43-CUjB7dwI",
	    authDomain: "budget-buddy-83479.firebaseapp.com",
	    databaseURL: "https://budget-buddy-83479.firebaseio.com",
	    projectId: "budget-buddy-83479",
	    storageBucket: "budget-buddy-83479.appspot.com",
	    messagingSenderId: "902171196575"
	  };
	  firebase.initializeApp(config);

  	const txtEmail = document.getElementById('txtEmail');
  	const txtPassword = document.getElementById('txtPassword');
  	var bLogin = document.getElementById('bLogin');

	// Login Event
	bLogin.addEventListener('click', e => {
		// Get Email and Password
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		// Sign in
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise.catch(function(e){
			console.log("FAILED.")
			var errorCode = e.code;
			var errorMessage = e.message;
			var errorDisplay = document.getElementById('errorMessage');
			var noUserErrorDisplay = document.getElementById('noUserMessage');

			console.log(e)
			if(errorCode === 'auth/wrong-password'){
				noUserErrorDisplay.classList.add('hidden');
				errorDisplay.classList.remove('hidden');
			}
			if(errorCode === 'auth/invalid-email'){
				noUserErrorDisplay.classList.add('hidden');
				errorDisplay.classList.remove('hidden');
			}
		    if(errorCode === 'auth/user-not-found'){
				errorDisplay.classList.add('hidden');
				noUserErrorDisplay.classList.remove('hidden');
			}
		});
	});
  	
  	// Auth listener
  	firebase.auth().onAuthStateChanged(user => {
  		if(user){
  			// match user to pending user
  			var txtEmail = document.getElementById('txtEmail').value;
  			var pending = firebase.database().ref("Pending");
			pending.on("value", function(snapshot) {
				snapshot.forEach(function(child) {
					if (child.val().Email === String(txtEmail)) {
						var currUser = firebase.auth().currentUser.uid;
						var ref = firebase.database().ref("users");
						var currUserRef = ref.child(currUser);

						var name = child.val().Name;
						var email = child.val().Email;

						currUserRef.set({
							Name: String(name),
							Email: String(email),
						});
					}
				});
			}, function (error) {
				console.log("Error:" + error.code);
			});


  			bLogin.style.display = 'none'	
  			window.location = 'home.html';
  			reload();
  		} 
  	});

}());