import React, {Component} from 'react';

export default class ChatBar extends Component{
    constructor(props){
        super(props);
        this.state ={
            message: "",
            user: "Anon",
            selectedFile: null,
        }
        this.createUser = this.createUser.bind(this)
        this.creation = this.creation.bind(this)
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
        this.fileUploadHandler = this.fileUploadHandler.bind(this)
    }
   // on enter a message will be created
    creation = (event) => {
        if(event.key === 'Enter') {
            const message = {
                username: this.props.user.name,
                content: event.target.value,
              }
            this.props.create(message)
        }
    }
    //on enter a user will be changed in the app's state
    createUser = (event) =>{

        if(event.key === 'Enter') {
        this.props.createUser(event.target.value)
        }
    }
    //on file addition it will add a file type message to the app's state
    fileSelectedHandler = event => {
        this.props.addFile(event.target.files[0])
    }
   
    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyUp={this.createUser} defaultValue={this.props.user.name} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.creation}/>
                <input type="file" onChange={this.fileSelectedHandler}/>
                
            </footer>
        )
    }
}