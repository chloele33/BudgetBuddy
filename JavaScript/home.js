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

	// TODO: read total saved amount from firebase and fill in
	var number = document.getElementById("number");
	number.innerHTML = "";
	//placeholder
	var amount = Number(1000000);
	number.innerHTML = "$" + amount;

	var notbroke = (amount > 0);

	var m1 = document.getElementById("message1");
	m1.innerHTML = "";
	m1.innerHTML = "Hi " + "Crystal, " + "you currently have";

	var m2 = document.getElementById("message2");
	m2.innerHTML = "";
	if (notbroke) {
		number.style.color = "#8db2d3";
		m2.innerHTML = "in your account. " + "You're doing well!";
	}
	else {
		number.style.color = "#F00";
		m2.innerHTML = "in your account. " + "You're broke! AHHHHHH!!!!";
	}

  	// Auth listener
  	firebase.auth().onAuthStateChanged(user => {
  		if(user){
  			// TODO: read total saved amount from firebase and fill in
  			var number = document.getElementById("number");
  			number.innerHTML = "";
  			//placeholder
  			number.innerHTML = "$" + "1,000,000";


  			bLogin.style.display = 'none'	
  			window.location = 'home.html';
  			reload();
  		} 
  	});

}());