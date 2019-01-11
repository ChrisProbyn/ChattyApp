import React, {Component} from 'react';

export default class Message extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: "Anon"  
        }
    }

    render() {
            //will check the incoming type and render the corresponding element
            if(this.props.type === "incomingMessage") {
                return(
                <div className="message">
                    <span className="message-username">{this.props.user}</span>
                    <span className="message-content">{this.props.text}</span>
                </div>);
            }else if (this.props.type === "incomingNotification"){
           
                return(
                <div className="notification" align="center">
                    <span className="notification-content">{this.props.text}</span>
                </div>);    
            } else if (this.props.type === "image"){

                return (
                 <div> 
                     <p>{this.props.user}</p>
                     <img src={this.props.text}></img>
                 </div>   
                
                )
            }else if (this.props.type === "video"){

                return (
                 
                     <video width="320" height="240" controls>
                        <source src={this.props.text} type="video/mp4"/>
                    </video>
                
                
                )
            }

          
        
    }
}
