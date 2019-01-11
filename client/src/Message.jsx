import React, {Component} from 'react';

export default class Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: "Anon"  
        }
    }

    render() {
      
            if(this.props.type === "incomingMessage") {
                return(
                <div className="message">
                    <span className="message-username">{this.props.user}</span>
                    <span className="message-content">{this.props.text}</span>
                </div>);
            }else if (this.props.type === "incomingNotification"){
           
                return(
                <div className="notification">
                    <span className="notification-content">{this.props.text}</span>
                </div>);    
            } else if (this.props.type === "image"){

                return (
                 <div> 
                     <p>{this.props.user}</p>
                     <img src={this.props.text}></img>
                 </div>   
                
                )
            }
          
        
    }
}
