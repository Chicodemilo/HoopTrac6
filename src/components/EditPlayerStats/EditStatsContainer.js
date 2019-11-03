import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import StatsService from '../../services/StatsService';
import courtImage from '../../../src/assets/court3.jpg';
import AdjusterItem from './AdjusterItem';
import editActions from './StatItems';

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
      theseActions: editActions,
    };
    // console.log(this.state.playerStats[this.state.activePlayerKey]);
  }

  updateStats = action => {
    if (this.state.activePlayers[this.state.activePlayerKey] != undefined) {
      //   let nowStateActive = {...this.state.activePlayers};
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
    this.props.makeActivePlayer(this.state.activePlayerKey, name);
    let newPlayers = (this.state.playerStats[
      this.state.activePlayerKey
    ].name = name);
    this.setState({
      activePlayers: newPlayers,
    });
  };

  render() {
    const adjusterItems = Object.keys(
      this.state.theseActions['editActions'],
    ).map(key => (
      <AdjusterItem
        key={key}
        action={key}
        friendlyName={this.state.theseActions['editActions'][key].friendly}
        statValue={
          this.state.playerStats[this.state.activePlayerKey][
            this.state.theseActions['editActions'][key].objectName
          ]
        }
        updateStats={() => {
          this.updateStats(key);
        }}
      />
    ));

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
            <View style={styles.statsAdjusters}>{adjusterItems}</View>
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
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 0.5,
    padding: 5,
    margin: 5,
  },
  statsAdjusters: {
    marginTop: 10,
    width: wp('85%'),
    backgroundColor: 'white',
    borderColor: '#a3a3a3',
    borderWidth: 1,
  },
});

export default EditStatsContainer;
