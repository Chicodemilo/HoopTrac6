import React, {Component} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

class PlayerInput extends Component {
  state = {
    playerName: '',
    inputMessage: 'Enter Player Name',
  };

  playerNameChangedHandler = val => {
    this.setState({
      playerName: val,
    });
  };

  playerSubmitHandler = () => {
    if (this.state.playerName.trim() === '') {
      this.setState(prevState => {
        return {
          inputMessage: 'YOU MUST ENTER A NAME',
        };
      });
    } else {
      if (this.props.playerCount < this.props.maxPlayers) {
        this.props.onPlayerAdded(this.state.playerName);
        this.setState({
          playerName: '',
          inputMessage: 'Enter Player Name',
        });
      } else {
        this.setState({
          playerName: '',
          inputMessage: 'Max Players Reached',
        });
      }
    }
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.playerInput}
          placeholder={this.state.inputMessage}
          value={this.state.playerName}
          onChangeText={this.playerNameChangedHandler}
          maxLength={10}
          blurOnSubmit={true}
        />
        <Button
          style={styles.inputButton}
          title="Add Player"
          onPress={this.playerSubmitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  instructions: {
    fontSize: 20,
    textAlign: 'left',
    color: '#333333',
    marginBottom: 5,
    height: 50,
  },
  playerInput: {
    height: 50,
    width: '60%',
    // borderColor: "#6b5d5c",
    backgroundColor: 'white',
    // borderWidth: 0.5,
    padding: 4,
    margin: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputButton: {
    margin: 2,
    width: '40%',
  },
});
export default PlayerInput;
