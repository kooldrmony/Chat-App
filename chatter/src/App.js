import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MessageList from './components/MessageList'
import Chatkit from '@pusher/chatkit';
import { instanceLocator, tokenUrl } from './components/config'

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      messages: []
    }
  }

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
            this.setState({
              messages:[...this.state.messages, message]
            })
          }
        }
      })
    })
  }


  render() {
    return (
      <div className="App">

        <MessageList messages={this.state.messages} />
        <SendMessageForm />
   
      </div>
    );
  }
}

export default App;
