import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import config from './FireBase.jsx';
import firebase from "firebase";

//create firebase storage reference
firebase.initializeApp(config);
var storage = firebase.storage()
var storageRef = storage.ref()
//create web socket
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
      //on incoming message parse it and check the type
      // then set state according to type
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
  //assign message incomingMessage type for logic on the message component
  createNewMessage = message => {
    const messageWithType = Object.assign({type:"incomingMessage"},message)
    exampleSocket.send(JSON.stringify(messageWithType))
  }
  //when the user changes the value, set the current user to the incoming text and broadcast a notifiacation to everyone
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
  //if the user adds a file this will determine its type and change its message state dependingly
  //it will upload the file to my storage ref and then give me a download url to give to every user
  // at this point it can only detect images and video. Possible improvements are move content types
  changeFile = incomingFile => {
    var name = incomingFile.name;
    var imageRef = storageRef.child(name);
    imageRef.put(incomingFile).then((snapshot) => {   
      if(snapshot.metadata.contentType === "image/png" || snapshot.metadata.contentType === "image/jpg" ) {
        imageRef.getDownloadURL().then((url) => {
          const message = {
            type: "image",
            content: url,
            username: this.state.currentUser.name
          }
          exampleSocket.send(JSON.stringify(message))
        })
      } else {
        imageRef.getDownloadURL().then((url) => {
          const message = {
            type: "video",
            content: url,
            username: this.state.currentUser.name
          }
          exampleSocket.send(JSON.stringify(message))
        })
      }   
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
          <p className="navbar-Counter" align="right">Number of users: {this.props.userNumber}</p>
        </nav>
        )
  }
}
export default App;
