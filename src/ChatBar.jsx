import React, {Component} from 'react';

export default class ChatBar extends Component{
    constructor(props){
        super(props);
        this.state ={
            message: "",
            user: ""
        }
        this.currentUser = this.currentUser.bind(this)
        this.creation = this.creation.bind(this)
    }
    currentUser(user){
        this.setState({
            user
        })
    };
    creation = (event) => {
        // event.preventDefault();
        if(event.key === 'Enter') {
            let id = Math.floor(Math.random()*100000);
            
            const message = {
                username: this.props.user.name,
                content: event.target.value,
                id: id
              }

            this.props.create(message)
        }
    }
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.user.name} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.creation}/>
            </footer>
        )
    }
}