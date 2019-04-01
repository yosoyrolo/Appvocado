var fba = {};

fba.auth = {};
fba.user = {};
fba.init = function(url) {
  fba.auth = firebase.auth();
};

fba.validateEmail = function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

fba.signIn = function(method, email, password) {
  switch (method) {
    case "email":
      var user = email;
      var pass = password;
      if (user == "" && pass == "") {
        console.error("Ingresa un correo y una contraseña");
        notify("Ingresa un correo y una contraseña");
      } else if (user != "" && pass == "") {
        console.error("Ingresa una contraseña");
        notify("Ingresa una contraseña");
      } else if (user == "" && pass != "") {
        console.error("Ingresa un correo");
        notify("Ingresa un correo");
      } else if (user != "" && pass != "") {
        if (fba.validateEmail(user)) {
          //el correo y la contraseña estan bien escritas
          const promise = fba.auth.signInWithEmailAndPassword(user, pass);
          promise.catch(e => loginPage.checkError(e));
        } else {
          console.error("Ingresa un correo valido");
          notify("Ingresa un correo valido");
        }
      }
      break;
    case "facebook":
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      break;
    default:
      break;
  }
};

fba.signUp = function(email, password, name) {
  if (fba.validateEmail(email)) {
    var user = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(user) {
        return firebase
          .auth()
          .currentUser.updateProfile({ displayName: name })
          .then(gotoProfilePage());
      });
  }
};

fba.signOut = function() {
  fba.auth.signOut();
};

fba.sesion = function(userIn, userOut) {
  fba.auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      //Inicio sesion
      userIn(firebaseUser);
      fba.user = firebaseUser;
    } else {
      //Cerro sesion
      userOut(firebaseUser);
      fba.user = firebaseUser;
    }
  });
};
