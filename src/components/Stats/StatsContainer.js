import React, {Component} from 'react';
import {
  Modal,
  View,
  Button,
  StyleSheet,
  Platform,
  ImageBackground,
} from 'react-native';
import PlayerStats from './PlayerStats';
import SendReportContainer from '../SendReport/SendReportContainer';
import courtImage from '../../../src/assets/court3.jpg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class StatsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalStats: props.finalStats.players,
      gameTime: props.finalStats.gameTime,
      gameId: props.finalStats.id,
      gameName: props.finalStats.name,
      gameDate: props.finalStats.date,
      showFinalStats: props.showFinalStats,
      hideFinalStats: props.hideFinalStats,
      showSendReport: false,
    };
  }

  showReportView = () => {
    this.setState({
      showSendReport: true,
    });
  };

  hideReportView = () => {
    this.setState({
      showSendReport: false,
    });
  };

  render() {
    let sendReportView = null;
    if (this.state.showSendReport == true) {
      sendReportView = (
        <SendReportContainer
          hideReportView={this.hideReportView}
          showSendReport={this.showSendReport}
          finalStats={this.state.finalStats}
          gameTime={this.state.gameTime}
          gameId={this.state.gameId}
          gameName={this.state.gameName}
          gameDate={this.state.gameDate}
        />
      );
    }

    return (
      <Modal visible={this.props.gameOver} animationType="slide">
        <ImageBackground
          source={courtImage}
          style={{width: '100%', height: '100%'}}>
          <View style={styles.gameView}>
            <Button
              title="Hide Game Stats"
              color="red"
              onPress={() => {
                this.props.hideFinalStats();
              }}
            />
            <Button
              title="Email Report"
              color="blue"
              onPress={() => {
                this.showReportView();
              }}
            />
          </View>
          <View style={styles.statsBox}>
            <PlayerStats
              finalStats={this.state.finalStats}
              gameTime={this.state.gameTime}
            />
          </View>
          {sendReportView}
        </ImageBackground>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  gameView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    color: 'green',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: Platform.OS === 'ios' ? 35 : 15,
    paddingBottom: 15,
    borderBottomColor: 'black',
    borderWidth: 1,
    width: wp('100%'),
  },
  statsBox: {
    // height: hp("84%")
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default StatsContainer;
