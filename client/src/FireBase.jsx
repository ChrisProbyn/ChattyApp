import firebase from "firebase";

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDQpUqKRd5KXWptdje2nf4hwpNqwQfIP74",
    authDomain: "chatty-app-258f6.firebaseapp.com",
    databaseURL: "https://chatty-app-258f6.firebaseio.com",
    projectId: "chatty-app-258f6",
    storageBucket: "chatty-app-258f6.appspot.com",
    messagingSenderId: "64293824832"
  };
  firebase.initializeApp(config);


var storage = firebase.storage().ref();
var storage = firebase.storage()
export default {storage};