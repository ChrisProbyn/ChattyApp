import React, {Component} from 'react';
import Message from './Message.jsx';


export default class MessageList extends Component{
    constructor(props){
        super(props);
    }
    
    render() {
        //this will map through all of the messages and build a message component for each one
        const allMessages = this.props.messages.map((message) =>    
           <Message key={message.id} text={message.content} user={message.username} type={message.type}/>
        )
       
       
        return (
            <div className="messages">
                {allMessages}
            </div>
        )
    }
}
