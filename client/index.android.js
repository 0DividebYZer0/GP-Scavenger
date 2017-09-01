/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


// Redux Imports for Initialization (Create Store)
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import allReducers from './src/reducers/index.js';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);



// import firebase from 'firebase'
// import firebaseconfig from './config/firebaseconfig.js'
import LoginForm from './src/components/LoginForm'
import TitledInput from './src/components/TitledInput'

import Button from './src/components/Button'
import Card from './src/components/Card'
import CardSection from './src/components/CardSection'

import { Router, Scene } from 'react-native-router-flux';

import MyCamera from './src/components/MyCamera';
import ChallengeList from './src/components/ChallengeList';
import ChallengeQuestion from './src/components/ChallengeQuestion';
import Chat from './src/components/Chat';
import CongratsPage from './src/components/CongratsPage';
import CreateGame from './src/components/CreateGame';
import GameLog from './src/components/GameLog';
import FailedPage from './src/components/FailedPage';
import Friends from './src/components/Friends';
import GPSChallenge from './src/components/GPSChallenge';
import HomePage from './src/components/HomePage';
import JoinGame from './src/components/JoinGame';
import Leaderboard from './src/components/Leaderboard';
import Login from './src/components/Login';
import MyGames from './src/components/MyGames';
import Notifications from './src/components/Notifications';
import OtherUsers from './src/components/OtherUsers';
import Preferences from './src/components/Preferences';
import Profile from './src/components/Profile';
import StartGame from './src/components/StartGame';
import Task from './src/components/Task';
import CreateChallenge from './src/components/CreateChallenge';
import CreateGPSChallenge from './src/components/CreateGPSChallenge';
import DemoGPSGame from './src/components/DemoGPSGame';


export default class client extends Component {
  constructor() {
    super()
    this.dummyGet = this.dummyGet.bind(this)
    this.dummyPost = this.dummyPost.bind(this)
    this.state = {
      dummyData: '',
      user: null
    }

    this.authSetUser = this.authSetUser.bind(this)
  }


  componentWillMount() {
    console.log('index.android.js has loaded')

    // firebase.initializeApp({
    //   apiKey: firebaseconfig.apiKey,
    //   authDomain: firebaseconfig.authDomain,
    //   databaseURL: firebaseconfig.databaseURL,
    //   projectId: firebaseconfig.projectId,
    //   storageBucket: firebaseconfig.storageBucket,
    //   messagingSenderId: firebaseconfig.messagingSenderId
    // })
  }

  dummyGet() {
    console.log(`in dummyGet()`)
    fetch('http://10.0.2.2:3000/api/images/getImages')
      .then( (response) => {
        console.log('whoooosh') 
        console.log(`${JSON.stringify(response)}`)
        let app = this
        this.setState({ dummyData: response }, () => { console.log(`state is now ${JSON.stringify(this.state)}`)})
      })
  }

  dummyPost() {
    console.log(`in dummyPost()`)

    var formData = new FormData()
    formData.append('jenFirstParm', 'blahvalue1')
    formData.append('jenSecondParam', 'blahvalue2')

    fetch('http://10.0.2.2:3000/api/images/postImages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "jenFirstParm": 'blahvalue1',
        "jensecondParam": 'blahvalue2'
      })
    })
      .then( (response) => {
        console.log('whoooosh') 
        console.log(`${JSON.stringify(response)}`)
        let app = this
        this.setState({ dummyData: response }, () => { console.log(`state is now ${JSON.stringify(this.state)}`)})
      })
  }

  authSetUser(){
    this.setState({user: firebase.auth().currentUser})
    .then(console.log('Current user: ', this.state.user))
    
  }

  render() {

    // if (!this.state.user) {
    //   return (
    //     <LoginForm user={this.state.user} setusermethod={this.authSetUser}/>
    //   )
    // } else {

    return (
      <Provider store={createStoreWithMiddleware(allReducers)}>
        <Router>
          <Scene key="root">

            <Scene key="homepage"
              component={HomePage}
              title="Home Page"
              initial
            />

            <Scene key="games" tabs={true}>
              <Scene key="startgame"
                component={StartGame}
                title="Start A Game"
              />
              <Scene key="creategame"
              component={CreateGame}
              title="Create Game"
              />
              <Scene key="leaderboard"
                component={Leaderboard}
                title="Leaderboard"
              />
            </Scene>

            <Scene key="mygames"
              component={MyGames}
              title="My Games"
            />

            <Scene key="joingame"
                component={JoinGame}
                title="Join a Game"
              />

            <Scene key="leaderboard"
              component={Leaderboard}
              title="Leaderboard"
            />

          <Scene key="camera"
            component={MyCamera}
            title="Camera"
          />

            <Scene key="profilestats" tabs={true}>
              <Scene
                key="profile"
                component={Profile}
                title="Profile"
              />
              <Scene
                key="friends"
                component={Friends}
                title="Friends"
              />
              <Scene
                key="otherusers"
                component={OtherUsers}
                title="Other Users"
              />
            </Scene>

            <Scene key="currentgame" tabs={true}>
              <Scene key="task"
                component={Task}
                title="Task"
              />
              <Scene key="demoGPSGame"
                component={DemoGPSGame}
                title="Demo GPS Game"
              />
              <Scene key="chat"
                component={Chat}
                title="Chat"
              />
              <Scene key="gamelog"
                component={GameLog}
                title="Log"
              />
              <Scene key="challengelist"
                component={ChallengeList}
                title="List"
                renderBackButton={()=>(null)}
              />
            </Scene>

            <Scene key="preferences"
              component={Preferences}
              title="Home Page"
            />

            <Scene key="notifications"
              component={Notifications}
              title="Notifications"
            />

            <Scene key="GPSchallenge"
              component={GPSChallenge}
              title="GPS Challenge"
            />

            <Scene key="createChallenge"
              component={CreateChallenge}
              title="Create a Challenge"
            />

            <Scene key="createGPSchallenge"
            component={CreateGPSChallenge}
            title="Create GPS challenge"
            />

            <Scene key="challengequestion"
              component={ChallengeQuestion}
              title="Challenge Question"
              renderBackButton={()=>(null)}
            />

            <Scene key="congratspage"
            component={CongratsPage}
            title="COMPLETED!!!"
            />

            <Scene key="failedpage"
              component={FailedPage}
              title="FAILED!!!"
              renderBackButton={()=>(null)}
            />

          </Scene>
        </Router>
      </Provider>
    );
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('client', () => client);
