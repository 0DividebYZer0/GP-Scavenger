import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Picker
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import HomePage from '../HomePage';
import CreateList from './CreateList';
import FloatingButton from '../reusable/FloatingButton';
import TitledInput from '../reusable/TitledInput';

// Redux Imports for binding stateToProps and dispatchToProps to the component
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {enteredField, challengesUpdated, submittedCreatedGame, challengeLocationSet} from '../../actions/index.js'

// gives the component access to store through props
const mapStateToProps = (state) => {
  console.log('Create Game state: ', state)
  return {
    createGameChallenges: state.create.createGameChallenges,
    createChallengeLocation: state.create.createChallengeLocation,
    createChallengeType: state.create.createChallengeType,
    createChallengeTitle: state.create.createChallengeTitle,
    createChallengeObjective: state.create.createChallengeObjective,
    createChallengeAnswer: state.create.createChallengeAnswer,
  }
}

// gives the component access to actions through props
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({enteredField, challengesUpdated, challengeLocationSet}, dispatch)
}


class CreateChallenge extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SideMenu menu={<HomePage/>}>
        <View style={styles.container}>

          <TitledInput
            label='Challenge Title'
            placeholder='Enter Here...'
            value={this.props.createChallengeTitle}
            onChangeText={(e) => {this.props.enteredField('createChallengeTitle', e)}}
          />

          {/* <TitledInput
            label='Challenge Type'
            placeholder='Enter Here...'
            value={this.props.createChallengeType}
            onChangeText={(e) => {this.props.enteredField('createChallengeType', e)}}
          /> */}

          <Text>Challenge Type:</Text>
          <Picker prompt='Select a Challenge Type' selectedValue={this.props.createChallengeType} onValueChange={(itemValue, itemIndex) => {this.props.enteredField('createChallengeType', itemValue)}} style={{height: 40, width: 150}} >
            <Picker.Item label='Riddle' value='riddleQuestion' />
            <Picker.Item label='Logic Puzzle' value='logicPuzzle' />
            <Picker.Item label='Photo' value='photoQuestion' />
            <Picker.Item label='Video' value='videoQuestion' />
            <Picker.Item label='New Type' value='newtype' />
          </Picker>

          <Text>{'Location: '}{this.props.createChallengeLocation ? 'Latitude: ' + JSON.stringify(this.props.createChallengeLocation.latitude.toFixed(2)) + ', Longitude: ' + JSON.stringify(this.props.createChallengeLocation.longitude.toFixed(2)) : '(No Location Set)'}</Text>

          <Button onPress={() => {Actions.createGPSchallenge()}}
          title="Set Location"
          color="#841584"/>

          <Button onPress={() => {this.props.challengeLocationSet(null)}}
          title="Clear Location"
          color="#841584"/>

          <TitledInput
            label='Challenge Objective'
            placeholder='Enter Here...'
            value={this.props.createChallengeObjective}
            onChangeText={(e) => {this.props.enteredField('createChallengeObjective', e)}}
          />
          <TitledInput
            label='Challenge Answer'
            placeholder='Enter Here...'
            value={this.props.createChallengeAnswer}
            onChangeText={(e) => {this.props.enteredField('createChallengeAnswer', e)}}
          />
          

          <Button onPress={() => {
            console.log('props: ', this.props)
          }}
          title="See Props"
          color="#841584"/>

          <Button onPress={() => {
            let temp = this.props.createGameChallenges
            temp.push({
              ChallengeLocation: this.props.createChallengeLocation,
              ChallengeType: this.props.createChallengeType,
              ChallengeTitle: this.props.createChallengeTitle,
              ChallengeObjective: this.props.createChallengeObjective,
              ChallengeAnswer: this.props.createChallengeAnswer
            })
            this.props.challengesUpdated(temp);


            Alert.alert(
              '',
              'Challenge Submitted!',
              [
                {text: 'Dismiss', onPress: () => console.log('OK Pressed!')},
              ]
            )

          }}
          title="Submit Challenge"
          color="#841584"/>


        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6ea1f4',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

// export default CreateGame;

// Redux Style export default:
export default connect(mapStateToProps, mapDispatchToProps)(CreateChallenge)