import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import axios from 'axios';

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
  }
  componentDidMount() {

    exampleSocket.onopen = (event) => {
      exampleSocket.onmessage = (event) => {
        
        const incomingMessage= JSON.parse(event.data); 
        console.log(incomingMessage)
        
        if(incomingMessage.Type === "incomingClient"){
          console.log("here")
          this.setState({
            numOfUsers:incomingMessage.numOfClients
          })
          console.log(this.state.numOfUsers)
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
    const messageWithType = Object.assign({type:"incomingMessage"},message)
    exampleSocket.send(JSON.stringify(messageWithType))
      
      
  }
  changeUser = incomingUser =>{
    console.log(incomingUser)

    this.setState({
      currentUser: {name: incomingUser}
    })
    const msg = {
      type: "incomingNotification",
      content:"user " + this.state.currentUser.name + " changed id to " + incomingUser,
      
    }
    exampleSocket.send(JSON.stringify(msg));
  }
  render() {
    return (
      <div>
        <NavBar userNumber={this.state.numOfUsers}/> 
        <MessageList messages={this.state.messages} />
        <ChatBar user ={this.state.currentUser} create={this.createNewMessage} createUser={this.changeUser}/>
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
