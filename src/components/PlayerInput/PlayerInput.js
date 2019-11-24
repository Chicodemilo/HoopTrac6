import React, {Component} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';

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
          inputMessage: "You Didn't Enter A Name",
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
    let addButton = null;
    if (this.props.showFinalStatsButtons == true) {
      addButton = (
        <Button
          style={styles.inputButton}
          title="Add Player"
          onPress={() =>
            Alert.alert(
              'Are You Sure?',
              'Adding a player now will start a new game and delete the current game.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Add Canceled!'),
                },
                {text: 'Start New Game', onPress: this.playerSubmitHandler},
              ],
              {cancelable: false},
            )
          }
        />
      );
    } else {
      addButton = (
        <Button
          style={styles.inputButton}
          title="Add Player"
          onPress={this.playerSubmitHandler}
        />
      );
    }

    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.playerInput}
          placeholder={this.state.inputMessage}
          value={this.state.playerName}
          onChangeText={this.playerNameChangedHandler}
          placeholderTextColor={'#b5b5b5'}
          maxLength={10}
          blurOnSubmit={true}
        />
        {addButton}
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
    height: 40,
    width: '60%',
    color: 'black',
    borderColor: '#bdbdbd',
    backgroundColor: 'white',
    borderWidth: 1,
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
