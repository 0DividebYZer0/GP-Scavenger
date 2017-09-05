import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllGameChallenges, setCurrentChallengeIndex } from '../../actions/index';
import ChallengeListEntry from './ChallengeListEntry';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllGameChallenges }, dispatch)
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps: ', state)
  return {
    gameId: state.play.gameId,
    challenges: state.play.allChallenges,
    index: state.play.currentChallengeIndex
  }
}

class ChallengeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    let challenges = (<Text>''</Text>)
    if (this.props.challenges) {
      challenges = this.props.challenges.map((challenge, i) => {
        return <ChallengeListEntry challenge={challenge} challengeIndex={i} index={this.props.index} key={i}/>
      })
    }

    console.log(this.props.challenges, 'challenges on list')
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>{this.props.gameId}</Text>
        {challenges}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#00FFFF'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeList);