Chatty App
=====================

A React and websocket based chat app.

![ChattyApp](/ChattyApp.gif?raw=true)

### Usage

Clone the Files and create your own git repo.
Create a Firebase account and project folder,
Create a config file with your firebases's project api key and other configurations
Export your config with to App.jsx.

```
Install the dependencies and start the server and client.
```
npm install
npm start the client and server
open http://localhost:3000


### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This project includes React ESLint configuration.


npm run lint


### Dependencies
### SERVER 
* express
* uuid
* ws
### Client
* React
* Webpack
* Firebase
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)