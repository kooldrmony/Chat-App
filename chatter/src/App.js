import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import './index.css';
import MessageList from './components/MessageList';
import Chatkit from '@pusher/chatkit';
import { instanceLocator, tokenUrl } from './components/config';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';

class App extends Component {
  
  constructor(){
    super()
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
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

      this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch(err => console.log('error on joinableRoom: ', err))
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
    .catch(err => console.log('error on connecting: ', err))
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
        <RoomList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <NewRoomForm />
   
      </div>
    );
  }
}

export default App;
