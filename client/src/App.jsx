import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      currentUser:{name: "bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "124234"
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "3563456"
        }
      ]
    }
    this.createNewMessage = this.createNewMessage.bind(this);
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      // console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  createNewMessage = message => {
      
      const incomingMessage= message;
      const oldMessages = this.state.messages;
      const newMessages = [...oldMessages, incomingMessage];
      this.setState({ messages: newMessages});
    
  }
  render() {
    return (
      <div>
        <NavBar /> 
        <MessageList messages={this.state.messages} />
        <ChatBar user ={this.state.currentUser} create={this.createNewMessage}/>
      </div>
    );
  }
}
class NavBar extends Component {
  render() {
    return (
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        )
  }
}
export default App;