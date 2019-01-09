import React, {Component} from 'react';

export default class ChatBar extends Component{
    constructor(props){
        super(props);
        this.state ={
            message: "",
            user: "Anon"
        }
        this.createUser = this.createUser.bind(this)
        this.creation = this.creation.bind(this)
    }
   
    creation = (event) => {
        // event.preventDefault();
        if(event.key === 'Enter') {
            // let id = Math.floor(Math.random()*100000);
            
            const message = {
                username: this.props.user.name,
                content: event.target.value,
              }

            this.props.create(message)
        }
    }
    createUser = (event) =>{
        // console.log(event.target.value);
        // console.log(this.props.user.name)
        this.props.createUser(event.target.value)
    }
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={this.createUser} defaultValue={this.props.user.name} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.creation}/>
            </footer>
        )
    }
}