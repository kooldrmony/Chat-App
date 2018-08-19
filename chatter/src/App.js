import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MessageList from './components/MessageList'
import Chatkit from '@pusher/chatkit';
import { instanceLocator, tokenUrl } from './components/config'
import SendMessageForm from './components/SendMessageForm'

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      messages: []
    }
    this.sendMessage = this.sendMessage.bind(this)
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
      this.currentUser = currentUser
      this.currentUser.subscribeToRoom({
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

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: 13776982
    })
  }


  render() {
    return (
      <div className="App">

        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage}/>
   
      </div>
    );
  }
}

export default App;
