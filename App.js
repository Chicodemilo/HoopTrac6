import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Keyboard,
  Platform,
} from 'react-native';
import {format, getTime} from 'date-fns';
import PlayerInput from './src/components/PlayerInput/PlayerInput';
import PlayerList from './src/components/PlayerList/PlayerList';
import StartButton from './src/components/Game/StartButton';
import courtImage from './src/assets/court3.jpg';
import StatsContainer from './src/components/Stats/StatsContainer';
import GameContainer from './src/components/Game/GameContainer';
import StatsService from './src/services/StatsService';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      inputMessage: 'Enter Player Name',
      playersObj: {},
      initialPlayerObj: {},
      playerLimit: 3,
      disableButton: true,
      gameInProgress: false,
      showFinalStats: false,
      gameTime: 0,
      endGameStats: '',
      firstActivePlayerName: '',
      firstActivePlayerKey: null,
      gameRestart: false,
    };
  }

  playerAddedHandler = playerName => {
    const activatePlayer =
      Object.keys(this.state.playersObj).length > 0 ? false : true;

    const playerKey = new Date().getTime();

    if (activatePlayer == true) {
      this.setState({
        firstActivePlayerKey: playerKey,
        firstActivePlayerName: playerName,
        gameTime: 0,
      });
    }

    let thisPlayer = {
      key: playerKey,
      name: playerName,
      active: activatePlayer,
      clockedIn: false,
      timePlayedSec: 0,
      timePlayedMin: '0:00',
      percentOfGamePlayed: 0,
      points: 0,
      shotAttempts: 0,
      shotsMade: 0,
      shootingPercentage: 0,
      twoPointAttempts: 0,
      twoPointMade: 0,
      threePointAttempts: 0,
      threePointMade: 0,
      threePointPercentage: 0,
      rebounds: 0,
      offRebounds: 0,
      defRebounds: 0,
      assists: 0,
      steals: 0,
      blocks: 0,
      turnOvers: 0,
      foulsCommitted: 0,
      technicals: 0,
      freeThrowAttempts: 0,
      freeThrowMade: 0,
      freeThrowPercentage: 0,
      pointsPerMin: 0,
      shotsPerMin: 0,
      reboundsPerMin: 0,
      assistsPerMin: 0,
      blocksPerMin: 0,
      turnOversPerMin: 0,
      foulsPerMin: 0,
      efficiencyRating: 0,
      assistToTurnOver: 0,
    };
    Keyboard.dismiss();
    this.setState(prevState => {
      return {
        playerObj: (prevState.playersObj[thisPlayer.key] = thisPlayer),
        disableButton: false,
      };
    });
  };

  toggleCheckIn = key => {
    this.setState(prevState => {
      prevState.playersObj[key].clockedIn = !prevState.playersObj[key]
        .clockedIn;
      return {
        players: prevState.playersObj,
      };
    });
  };

  playerDeletedHandler = key => {
    let buttonOff =
      Object.keys(this.state.playersObj).length > 1 ? false : true;
    this.setState(prevState => {
      delete prevState.playersObj[key];
      return {
        players: prevState.playersObj,
        inputMessage: 'Enter Player Name',
        disableButton: buttonOff,
      };
    });
  };

  startTheGameHandler = index => {
    if (this.state.gameRestart === false) {
      this.setState(prevState => {
        return {
          endGameStats: {},
          gameInProgress: true,
        };
      });
    }
    if (this.state.gameRestart === true) {
      this.setState(prevState => {
        return {
          playersObj: prevState.endGameStats.players,
          gameInProgress: true,
        };
      });
    }
  };

  gameEndHandler = (endGameMin, endGameStats, endGameTime) => {
    Object.keys(endGameStats).map(key => {
      endGameStats[key].clockedIn = false;
    });

    StatsService.calculateFinalStats(endGameStats, endGameTime);

    const endGame = {
      id: this.makeGameId(),
      date: format(new Date(), 'yyyy-MM-dd'),
      name: 'BBall Game: ' + format(new Date(), 'M/d/yyyy'),
      players: endGameStats,
      gameTime: endGameMin,
    };

    this.setState(prevState => {
      return {
        disableButton: true,
        playersObj: {},
        gameInProgress: false,
        endGameStats: endGame,
        gameTime: endGameTime,
      };
    });
  };

  makeGameId = () => {
    let id = Math.floor(getTime(new Date()) / 1000);
    id = id + Math.floor(Math.random() * 10000);
    return id;
  };

  restartGameHandler = () => {
    this.setState(
      {
        gameRestart: true,
      },
      () => {
        this.startTheGameHandler();
      },
    );
  };

  startNewGameHandler = () => {
    this.setState(
      {
        gameRestart: false,
      },
      () => {
        this.startTheGameHandler();
      },
    );
  };

  showFinalStats = () => {
    this.setState({
      showFinalStats: true,
    });
  };

  hideFinalStats = () => {
    this.setState({
      showFinalStats: false,
    });
  };

  render() {
    let finalStatsButton =
      this.state.endGameStats != '' ? (
        <View style={styles.statsRestartButtons}>
          <Text style={styles.gameTitle}>{this.state.endGameStats.name}</Text>
          <Button
            style={styles.baseButton}
            title="Show Stats"
            color="#cc5500"
            onPress={() => {
              this.showFinalStats();
            }}
          />
          <Button
            style={styles.baseButton}
            title="Resume Game"
            color="#448ccf"
            onPress={() => {
              this.restartGameHandler();
            }}
          />
        </View>
      ) : null;

    let endGameView = null;
    if (this.state.showFinalStats == true) {
      endGameView = (
        <StatsContainer
          showFinalStats={this.state.showFinalStats}
          hideFinalStats={this.hideFinalStats}
          finalStats={this.state.endGameStats}
          gameTime={this.state.gameTime}
        />
      );
    }

    return (
      <ImageBackground
        source={courtImage}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          {Object.keys(this.state.playersObj).length > 0 ? (
            <GameContainer
              gamePlayers={this.state.playersObj}
              initialPlayers={this.state.initialPlayerObj}
              gameInProgress={this.state.gameInProgress}
              gameEnd={this.gameEndHandler}
              firstActivePlayerKey={this.state.firstActivePlayerKey}
              firstActivePlayerName={this.state.firstActivePlayerName}
              gameRestart={this.state.gameRestart}
              gameTime={this.state.gameTime}
            />
          ) : null}

          {endGameView}

          <StartButton
            startTheGame={this.startNewGameHandler}
            allowGame={this.state.disableButton}
          />
          <Text style={styles.welcome}>HoopTrac</Text>
          <PlayerInput
            onPlayerAdded={this.playerAddedHandler}
            maxPlayers={this.state.playerLimit}
            playerCount={Object.keys(this.state.playersObj).length}
          />
          <PlayerList
            players={this.state.players}
            playerObj={this.state.playersObj}
            onItemDeleted={this.playerDeletedHandler}
            onPlayerCheckIn={this.toggleCheckIn}
          />
          {finalStatsButton}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: Platform.OS === 'ios' ? 50 : 15,
    paddingBottom: 30,
  },
  welcome: {
    fontSize: 60,
    color: '#cc5500',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  courtPic: {
    height: 500,
    width: 300,
    zIndex: -5,
    transform: [{rotate: '90deg'}],
  },
  statsRestartButtons: {
    padding: 7,
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderBottomColor: '#521800',
    borderTopColor: '#521800',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  gameTitle: {
    width: '100%',
    textAlign: 'center',
  },
});
