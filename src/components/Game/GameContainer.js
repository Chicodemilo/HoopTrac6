import React, {Component} from 'react';
import {
  Modal,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import PlayerBox from './Players/PlayerBox';
import ClockInButton from './Buttons/ClockInButton';
import ShotButtonContainer from './Buttons/ShotButtonContainer';
import StatsService from '../../services/StatsService';
import ClockService from '../../services/ClockService';
import ReboundButtonContainer from './Buttons/ReboundButtonContainer';
import FreeThrowButtonContainer from './Buttons/FreeThrowButtonContainer';
import AssistButtonContainer from './Buttons/AssistButtonContainer';
import FoulButtonContainer from './Buttons/FoulButtonContainer';
import EditStatsContainer from '../EditPlayerStats/EditStatsContainer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// TODO Fix View overlap on buttons on android

class GameContainer extends Component {
  constructor(props) {
    super(props);
    if (this.props.gameRestart === true) {
      this.state = {
        activePlayers: props.gamePlayers,
        oldActivePlayers: props.gamePlayers,
        haveUndo: false,
        gameTime: this.props.gameTime,
        gameMin: '',
        gameActive: true,
        timerString: 'Pause Game Time',
        activePlayerKey: props.firstActivePlayerKey,
        activePlayerName: props.firstActivePlayerName,
        clockInWarning: false,
        showEditStats: false,
      };
    } else {
      this.state = {
        activePlayers: props.gamePlayers,
        oldActivePlayers: props.gamePlayers,
        haveUndo: false,
        gameTime: 0,
        gameMin: '0:00',
        gameActive: true,
        timerString: 'Pause Game Time',
        activePlayerKey: props.firstActivePlayerKey,
        activePlayerName: props.firstActivePlayerName,
        clockInWarning: false,
        showEditStats: false,
      };
    }
    this.ticker = setInterval(this.timeTick, 1000);
  }

  componentDidMount() {}
  componentWillUnmount() {
    //
    clearInterval(this.ticker);
  }

  timeTick = () => {
    let NewTimeData = ClockService.tick(
      this.state.gameActive,
      this.props.gameInProgress,
      this.state.activePlayers,
      this.state.gameTime,
    );
    if (NewTimeData.activePlayers) {
      this.setState({
        activePlayers: NewTimeData.activePlayers,
        gameTime: NewTimeData.gameTime,
        gameMin: NewTimeData.gameMin,
      });
    }
  };

  setActivePlayer = (thisPlayerKey, thisPlayerName) => {
    this.setState({
      activePlayerKey: thisPlayerKey,
      activePlayerName: thisPlayerName,
    });

    Object.keys(this.state.activePlayers).map(key => {
      if (key == thisPlayerKey) {
        this.state.activePlayers[key].active = true;
      } else {
        this.state.activePlayers[key].active = false;
      }
    });
  };

  toggleClockIn = () => {
    this.state.activePlayers[this.state.activePlayerKey].clockedIn = !this.state
      .activePlayers[this.state.activePlayerKey].clockedIn;
  };

  toggleTimer = () => {
    let buttonText = this.state.gameActive
      ? 'UnPause Game Time'
      : 'Pause Game Time';
    this.setState(prevState => {
      return {
        gameActive: !prevState.gameActive,
        timerString: buttonText,
      };
    });
  };

  addToOldActivePlayers = activePlayers => {
    let activePlayersImmutable = {};
    Object.keys(activePlayers).map(key => {
      let stats = {...activePlayers[key]};
      activePlayersImmutable[key] = stats;
    });
    // let newOldActivePlayers = this.state.oldActivePlayers;
    this.setState(prevState => {
      return {
        oldActivePlayers: activePlayersImmutable,
        haveUndo: true,
      };
    });
  };

  clockInTest = () => {
    if (
      this.state.activePlayers[this.state.activePlayerKey].clockedIn == false
    ) {
      this.setState(prevState => {
        return {
          clockInWarning: true,
        };
      });
    }
    setTimeout(() => {
      this.setState(prevState => {
        return {
          clockInWarning: false,
        };
      });
    }, 1200);
  };

  updateStats = action => {
    if (this.state.activePlayers[this.state.activePlayerKey] != undefined) {
      let nowStateActive = {...this.state.activePlayers};
      this.addToOldActivePlayers(nowStateActive);
      this.clockInTest();
      let newPlayers = StatsService.updateStat(
        this.state.activePlayers,
        this.state.activePlayerKey,
        action,
        1,
      );
      this.setState({
        activePlayers: newPlayers,
      });
    }
  };

  clearGameTimer = () => {
    let clearedPlayers = {...this.state.activePlayers};
    Object.keys(this.state.activePlayers).map(key => {
      clearedPlayers = StatsService.resetPlayerStats(
        clearedPlayers,
        key,
        clearedPlayers[key].name,
      );
    });

    this.setState({
      activePlayers: clearedPlayers,
      gameTime: 0,
      gameMin: 0,
      gameActive: true,
      timerString: 'Pause Game Time',
    });
  };

  resetPlayerStats = () => {
    let newPlayers = StatsService.resetPlayerStats(
      this.state.activePlayers,
      this.state.activePlayerKey,
      this.state.activePlayerName,
    );
    this.setState({
      activePlayers: newPlayers,
    });
  };

  undoButtonHandler = () => {
    let newPlayers = StatsService.undoButtonHandler(
      this.state.activePlayers,
      this.state.oldActivePlayers,
    );
    this.setState({
      activePlayers: newPlayers,
      haveUndo: false,
    });
  };

  showEditStats = () => {
    this.setState({
      showEditStats: true,
    });
  };

  hideEditStats = () => {
    this.setState({
      showEditStats: false,
    });
  };

  stopGame = () => {
    this.setState({
      gameActive: false,
    });
    this.props.gameEnd(
      this.state.gameMin,
      this.state.activePlayers,
      this.state.gameTime,
    );
  };

  render() {
    let thisEditStatsContainer = null;

    if (this.state.showEditStats) {
      thisEditStatsContainer = (
        <EditStatsContainer
          playerStats={this.state.activePlayers}
          activePlayerKey={this.state.activePlayerKey}
          showEditStats={this.state.showEditStats}
          hideEditStats={this.hideEditStats}
          makeActivePlayer={this.setActivePlayer}
        />
      );
    }

    let clockInStatus = false;
    let freeThrowMiss = 0;

    if (this.state.activePlayers[this.state.activePlayerKey] != undefined) {
      clockInStatus = this.state.activePlayers[this.state.activePlayerKey]
        .clockedIn;
      freeThrowMiss =
        this.state.activePlayers[this.state.activePlayerKey].freeThrowAttempts -
        this.state.activePlayers[this.state.activePlayerKey].freeThrowMade;
    }

    this.state.gameActive ? null : (
      <View style={styles.overlay} pointerEvents="none" />
    );

    let activeWarning = this.state.clockInWarning ? (
      <View style={styles.warningBox}>
        <Text style={styles.warningText}>Clock In Player?</Text>
      </View>
    ) : null;

    let editStatsButton = (
      <TouchableOpacity
        style={styles.editStatsButton}
        onPress={this.showEditStats}>
        <View>
          <Text style={styles.editStatsText}>edit</Text>
        </View>
      </TouchableOpacity>
    );

    let undoButton = null;

    if (this.state.haveUndo) {
      undoButton = (
        <TouchableOpacity
          style={styles.resetButtons}
          onPress={this.undoButtonHandler}>
          <View>
            <Text style={styles.resetText}>undo</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      undoButton = (
        <TouchableOpacity style={styles.resetButtonsInactive}>
          <View>
            <Text style={styles.resetText} />
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <Modal visible={this.props.gameInProgress} animationType="slide">
        {thisEditStatsContainer}
        <View style={styles.gameView}>
          <PlayerBox
            gamePlayers={this.state.activePlayers}
            makeActivePlayer={this.setActivePlayer}
            clockInPlayer={this.clockInPlayer}
          />
          <View
            style={this.state.gameActive ? styles.buttonBox : styles.overlay}
            pointerEvents={this.state.gameActive ? 'auto' : 'none'}>
            <ClockInButton
              toggleClockIn={this.toggleClockIn}
              activeClockedIn={clockInStatus}
            />
            <ShotButtonContainer
              shotMadeTwo={() => this.updateStats('shotMadeTwo')}
              shotMadeThree={() => this.updateStats('shotMadeThree')}
              shotMissTwo={() => this.updateStats('shotMissTwo')}
              shotMissThree={() => this.updateStats('shotMissThree')}
            />
            <ReboundButtonContainer
              defensiveRebound={() => this.updateStats('defensiveRebound')}
              offensiveRebound={() => this.updateStats('offensiveRebound')}
            />
            <FreeThrowButtonContainer
              freeThrowMade={() => this.updateStats('freeThrowMade')}
              freeThrowMiss={() => this.updateStats('freeThrowMiss')}
            />
            <AssistButtonContainer
              assist={() => this.updateStats('assist')}
              steal={() => this.updateStats('steals')}
              block={() => this.updateStats('block')}
            />
            <FoulButtonContainer
              fouls={() => this.updateStats('fouls')}
              turnOvers={() => this.updateStats('turnOvers')}
            />
            <View style={styles.resetBox}>
              <TouchableOpacity
                style={styles.resetButtons}
                onPress={this.resetPlayerStats}>
                <View>
                  <Text style={styles.resetText}>reset player stats</Text>
                </View>
              </TouchableOpacity>
              {undoButton}
            </View>
          </View>
          <View style={styles.gameStats}>
            {this.state.activePlayerKey != null ? (
              <View>
                <Text style={styles.greenText}>
                  &bull;&nbsp;Game Clock:&nbsp;
                  {this.state.gameMin + `\n`}
                  &bull;&nbsp;Player Min:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .timePlayedMin + `\n`}
                  &bull;&nbsp;Points:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey].points +
                    `\n`}
                  &bull;&nbsp;Shot Att:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .shotAttempts + ` `}
                  &nbsp;Made:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .shotsMade + ` `}
                  &nbsp;&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .shootingPercentage + `%\n`}
                  &bull;&nbsp;2pt Att:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .twoPointAttempts + ` `}
                  &nbsp;Made:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .twoPointMade + ` `}
                  &nbsp;&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .twoPointPercentage + `% \n`}
                  &bull;&nbsp;3pt Att:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .threePointAttempts + ` `}
                  &nbsp;Made:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .threePointMade + ` `}
                  &nbsp;&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .threePointPercentage + `% \n`}
                  &bull;&nbsp;Rebounds:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .rebounds + ` `}
                  &nbsp;Def:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .defRebounds + ` `}
                  &nbsp;Off:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .offRebounds + `\n`}
                  &bull;&nbsp;Free Throw Made:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .freeThrowMade + ` `}
                  &nbsp;Missed:&nbsp;
                  {freeThrowMiss + ` `}
                  &nbsp;&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .freeThrowPercentage + `% \n`}
                  &bull;&nbsp;Assists:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .assists + `\n`}
                  &bull;&nbsp;Blocks:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey].blocks +
                    `\n`}
                  &bull;&nbsp;Steals:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey].steals +
                    `\n`}
                  &bull;&nbsp;Fouls:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .foulsCommitted + ` `}
                  &nbsp;&nbsp;&bull;&nbsp;TurnOvers:&nbsp;
                  {this.state.activePlayers[this.state.activePlayerKey]
                    .turnOvers + ` `}
                </Text>
              </View>
            ) : null}
            <View style={styles.activePlayerNameBox}>
              <Text style={styles.activePlayerName}>
                {this.state.activePlayerKey != null
                  ? this.state.activePlayerName
                  : null}
              </Text>
            </View>
            {editStatsButton}
            {activeWarning}
          </View>
          <View style={styles.endGame}>
            <Button
              style={styles.baseButton}
              title={
                this.state.gameActive ? 'Pause Game Time' : 'UnPause Game Time'
              }
              color="orange"
              onPress={this.toggleTimer}
            />
            <Button
              style={styles.baseButton}
              title="End Game"
              color="red"
              onPress={this.stopGame}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  gameView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    color: 'green',
    marginTop: 0,
    marginBottom: 0,
    height: hp('100%'),
    paddingTop: Platform.OS === 'ios' ? 27 : 5,
    paddingBottom: 0,
  },
  buttonBox: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: hp('45%'),
    borderTopColor: 'green',
    borderTopWidth: 1,
  },
  overlay: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    height: hp('45%'),
    borderTopColor: 'green',
    borderTopWidth: 1,
    backgroundColor: 'black',
    opacity: 0.4,
  },
  endGame: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    height: hp('7%'),
    bottom: 9,
    padding: 2,
    width: '100%',
    borderTopColor: 'green',
    borderTopWidth: 0.5,
  },
  baseButton: {
    padding: 10,
  },
  gameStats: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
    position: 'absolute',
    height: hp('31%'),
    bottom: 30,
    padding: 7,
    borderTopColor: 'green',
    borderTopWidth: 0.5,
  },
  resetBox: {
    width: '100%',
    marginTop: 0,
    flexDirection: 'row',
    height: hp('5%'),
    padding: 2,
    alignItems: 'flex-start',
  },
  resetButtons: {
    backgroundColor: '#212121',
    margin: 3,
    padding: 5,
    flex: 1,
    height: hp('4%'),
  },
  resetButtonsInactive: {
    backgroundColor: 'black',
    margin: 3,
    padding: 5,
    flex: 1,
    height: hp('4%'),
  },
  resetText: {
    color: '#ddd',
    fontSize: 11,
  },
  warningText: {
    color: '#00b3ff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  warningBox: {
    position: 'absolute',
    right: 5,
    top: 42,
  },
  editStatsButton: {
    position: 'absolute',
    right: 5,
    top: 26,
  },
  editStatsText: {
    color: '#858585',
    fontSize: 12,
  },
  activePlayerNameBox: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 2,
  },
  activePlayerName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  greenText: {
    color: 'green',
    fontSize: Platform.OS === 'ios' ? 11 : 11,
  },
});

export default GameContainer;
