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
  }

  updateStats = (action, direction) => {
    if (this.state.playerStats[this.state.activePlayerKey] != undefined) {
      let newPlayers = StatsService.updateStat(
        this.state.playerStats,
        this.state.activePlayerKey,
        action,
        direction,
      );
      this.setState({
        playerStats: newPlayers,
      });
    }
  };

  savePlayerName = name => {
    this.props.makeActivePlayer(this.state.activePlayerKey, name);
    this.state.playerStats[this.state.activePlayerKey].name = name;
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
        updateStatsUp={() => {
          this.updateStats(key, 1);
        }}
        updateStatsDown={() => {
          this.updateStats(key, -1);
        }}
      />
    ));

    return (
      <Modal visible={this.props.showEditStats} animationType="slide">
        <ImageBackground
          source={courtImage}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.finishedButton}>
            <Button
              style={styles.baseButton}
              title="Finished"
              color="#cc5500"
              onPress={() => {
                this.props.hideEditStats();
              }}
            />
          </View>
          <View style={styles.statsBox}>
            <View style={styles.nameBox}>
              <Text style={styles.textTitle}>Player Name:</Text>
              <TextInput
                style={styles.nameInput}
                onChangeText={this.savePlayerName}
                value={this.state.playerStats[this.state.activePlayerKey].name}
                maxLength={10}
              />
            </View>
            <View style={styles.statsAdjusters}>{adjusterItems}</View>
            <View style={styles.adjustedStats}>
              <Text style={styles.adjustedText}>
                Points:{' '}
                {this.state.playerStats[this.state.activePlayerKey].points}
              </Text>
              <Text style={styles.adjustedText}>
                Rebounds:{' '}
                {this.state.playerStats[this.state.activePlayerKey].rebounds}
              </Text>
              <Text style={styles.adjustedText}>
                Total Shot Attempts:{' '}
                {
                  this.state.playerStats[this.state.activePlayerKey]
                    .shotAttempts
                }
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  finishedButton: {
    paddingTop: 27,
    padding: 4,
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderBottomColor: '#521800',
    // borderTopColor: '#521800',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  statsBox: {
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    height: hp('100%'),
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  textTitle: {
    color: '#8a8a8a',
    fontSize: 11,
    fontWeight: 'bold',
  },
  adjustedText: {
    color: '#8a8a8a',
    fontSize: 11,
    fontWeight: 'bold',
  },
  baseButton: {
    marginTop: 50,
    position: 'absolute',
    top: 35,
    left: 10,
  },
  nameBox: {
    width: wp('85%'),
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 5,
    borderColor: '#a3a3a3',
    borderWidth: 1,
  },
  adjustedStats: {
    marginTop: 10,
    width: wp('85%'),
    backgroundColor: 'white',
    padding: 10,
    borderColor: '#a3a3a3',
    borderWidth: 1,
  },
  nameInput: {
    height: 30,
    width: '60%',
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
