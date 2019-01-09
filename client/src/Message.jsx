import React, {Component} from 'react';

export default class Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: "Anon"  
        }
    }

    render() {
      
        
        return (
            
            <div className="message">
                <span className="message-username">{this.props.user}</span>
                <span className="message-content">{this.props.text}</span>
            </div>
        )
    }
}
