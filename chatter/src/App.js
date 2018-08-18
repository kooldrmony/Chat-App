import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MessageList from './components/MessageList'
import Chatkit from '@pusher/chatkit';
import { instanceLocator, tokenUrl } from './components/config'

class App extends Component {

  componentDidMount() {

    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'Derrick',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
    .then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: 13776982,
        hooks: {
          onNewMessage: message => {
            console.log('message.text ', message.text);
          }
        }
      })
    })
  }


  render() {
    return (
      <div className="App">

        <MessageList />
   
      </div>
    );
  }
}

export default App;
