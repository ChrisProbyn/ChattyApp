import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import axios from 'axios';
import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDQpUqKRd5KXWptdje2nf4hwpNqwQfIP74",
  authDomain: "chatty-app-258f6.firebaseapp.com",
  databaseURL: "https://chatty-app-258f6.firebaseio.com",
  projectId: "chatty-app-258f6",
  storageBucket: "chatty-app-258f6.appspot.com",
  messagingSenderId: "64293824832"
};
firebase.initializeApp(config);
var storage = firebase.storage()

var storageRef = storage.ref()
var exampleSocket = new WebSocket("ws:localhost:3001");

class App extends Component {
 
  constructor(props){
    super(props);
    this.state ={
      currentUser:{name: "bob"},
      messages: [],
      numOfUsers: 0,
    }
    this.createNewMessage = this.createNewMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changeFile = this.changeFile.bind(this);
  }
  componentDidMount() {

    exampleSocket.onopen = (event) => {
      exampleSocket.onmessage = (event) => {
        
        const incomingMessage= JSON.parse(event.data); 
       
        
        if(incomingMessage.Type === "incomingClient"){
          
          this.setState({
            numOfUsers:incomingMessage.numOfClients
          })
        
        }
        else{
          const oldMessages = this.state.messages;
          const newMessages = [...oldMessages, incomingMessage];
          this.setState({ messages: newMessages});
        }
    };
  }
  }

  createNewMessage = message => {
    console.log(this.state.selectedFile)
    const messageWithType = Object.assign({type:"incomingMessage"},message)
    exampleSocket.send(JSON.stringify(messageWithType))
      
      
  }
  changeUser = incomingUser =>{
    this.setState({
      currentUser: {name: incomingUser}
    })
    const msg = {
      type: "incomingNotification",
      content:"user " + this.state.currentUser.name + " changed id to " + incomingUser,
      
    }
    exampleSocket.send(JSON.stringify(msg));
  }
  changeFile = incomingFile => {
    var name = incomingFile.name;
    var imageRef = storageRef.child(name);
    imageRef.put(incomingFile).then((snapshot) => {
        console.log(snapshot)
        // console.log(imageRef.getDownloadURL())
        imageRef.getDownloadURL().then((url) => {
          console.log(url)
          const message = {
            type: "image",
            content: url,
            username: this.state.currentUser.name
          }
          console.log("test ",message);
        
          exampleSocket.send(JSON.stringify(message))
 
        })
        
     
    });
 
  }

  render() {
    return (
      <div>
        <NavBar userNumber={this.state.numOfUsers}/> 
        <MessageList messages={this.state.messages} image={this.state.selectedFile} />
        <ChatBar user ={this.state.currentUser} create={this.createNewMessage} createUser={this.changeUser} addFile={this.changeFile}/>
      </div>
    );
  }

}
class NavBar extends Component {
  render() {
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p>Number of users: {this.props.userNumber}</p>
        </nav>
        )
  }
}
export default App;
