import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import StatsService from '../../services/StatsService';
import courtImage from '../../../src/assets/court3.jpg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class EditStatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStats: props.playerStats,
      activePlayerKey: props.activePlayerKey,
      hideEditStats: props.hideEditStats,
    };
    console.log('HERE: EditStatsContainer.js 28');
    console.log(this.state.activePlayerKey);
    console.log(this.state.playerStats);
  }

  updateStats = action => {
    if (this.state.activePlayers[this.state.activePlayerKey] != undefined) {
      let nowStateActive = {...this.state.activePlayers};
      //   this.addToOldActivePlayers(nowStateActive);
      //   this.clockInTest();
      let newPlayers = StatsService.updateStat(
        this.state.activePlayers,
        this.state.activePlayerKey,
        action,
      );
      this.setState({
        activePlayers: newPlayers,
      });
    }
  };

  savePlayerName = name => {
    let newPlayers = (this.state.playerStats[
      this.state.activePlayerKey
    ].name = name);
    this.setState({
      activePlayers: newPlayers,
    });
  };

  render() {
    return (
      <Modal visible={this.props.showEditStats} animationType="slide">
        <ImageBackground
          source={courtImage}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.statsBox}>
            <Button
              style={styles.baseButton}
              title="Done!!!"
              color="#cc5500"
              onPress={() => {
                this.props.hideEditStats();
              }}
            />
            <TextInput
              style={styles.nameInput}
              onChangeText={this.savePlayerName}
              value={this.state.playerStats[this.state.activePlayerKey].name}
              maxLength={10}
            />
          </View>
        </ImageBackground>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  statsBox: {
    padding: 25,
    height: hp('100%'),
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  baseButton: {
    marginTop: 50,
    position: 'absolute',
    top: 35,
    left: 10,
  },
  nameInput: {
    height: 50,
    width: '93%',
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 0.5,
    padding: 5,
    margin: 5,
  },
});

export default EditStatsContainer;
