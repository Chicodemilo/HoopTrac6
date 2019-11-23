import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import {format, getTime} from 'date-fns';
import axios from 'axios';
import courtImage from '../../../src/assets/court3.jpg';
import {URL_ONE, URL_TWO, NAME, EMAIL, PW} from '../../../info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class EmailInput extends Component {
  //
  state = {
    emailSent: false,
    gameNamed: false,
    gameName: this.props.gameName,
    gameId: this.props.gameId,
    gameDate: this.props.gameDate,
    gameOpponent: this.props.gameOpponent,
    gameNotes: this.props.gameNotes,
    emailAddress: '',
    finalStats: this.props.finalStats,
    showEmailWarning: false,
    gameSent: false,
  };

  componentDidMount() {}

  saveGameName = val => {
    this.setState(prevState => {
      return {
        gameNamed: true,
        gameName: val,
      };
    });
  };

  saveGameOpponent = val => {
    this.setState(prevState => {
      return {
        gameOpponent: val,
      };
    });
  };

  saveGameNotes = val => {
    this.setState(prevState => {
      return {
        gameNotes: val,
      };
    });
  };

  saveEmail = val => {
    this.setState({
      emailAddress: val,
    });
  };

  sendTheEmail = () => {
    let email = this.state.emailAddress.toLocaleLowerCase();
    let validEmail = this.checkEmailAddress(email);
    if (validEmail) {
      this.callAPI('gameEmail');
    } else {
      this.setState(prevState => {
        return {
          showEmailWarning: true,
        };
      });

      setTimeout(() => {
        this.setState(prevState => {
          return {
            showEmailWarning: false,
          };
        });
      }, 1200);
    }
  };

  async callAPI(type) {
    var formData = new FormData();
    formData.append('name', NAME);
    formData.append('email', EMAIL);
    formData.append('password', PW);
    formData.append('password_confirmation', PW);

    const hash = await axios({
      method: 'post',
      url: URL_ONE,
      data: formData,
      config: {headers: {'Content-Type': 'multipart/form-data'}},
    })
      .then(function(response) {
        return response.data.access_token;
      })
      .catch(function(error) {
        console.log(error);
        return error;
      });

    switch (type) {
      case 'gameEmail':
        this.sendGame(hash);
        break;

      default:
        break;
    }
  }

  async sendGame(key) {
    let sendData = {
      data: {
        email: this.state.emailAddress,
        game: {
          id: this.state.gameId,
          date: this.state.gameDate,
          name: this.state.gameName,
          opponent: this.state.gameOpponent,
          notes: this.state.gameNotes,
          players: this.state.finalStats,
        },
      },
    };

    var bearer = 'Bearer ' + key;

    let didItWork = await fetch(URL_TWO, {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        Authorization: bearer,
        mode: 'no-cors',
        cache: 'no-cache',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        if (data.data.sent == true) {
          this.setState(prevState => {
            return {
              gameSent: true,
            };
          });

          setTimeout(() => {
            this.setState(prevState => {
              return {
                gameSent: false,
              };
            });
          }, 2500);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  checkEmailAddress(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    let emailWarning = this.state.showEmailWarning ? (
      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          Please Enter A Valid Email Address
        </Text>
      </View>
    ) : null;

    let gameSentAlert = this.state.gameSent ? (
      <View style={styles.warningBox}>
        <Text style={styles.emailText}>Email Sent</Text>
      </View>
    ) : null;

    return (
      <ImageBackground
        source={courtImage}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabels}>Game Name: </Text>
          <TextInput
            style={styles.emailInput}
            onChangeText={this.saveGameName}
            value={this.state.gameName}
            placeholderTextColor={'#b5b5b5'}
            maxLength={30}
          />

          <Text style={styles.inputLabels}>Opponent: </Text>
          <TextInput
            style={styles.emailInput}
            onChangeText={this.saveGameOpponent}
            value={this.state.gameOpponent}
            placeholderTextColor={'#b5b5b5'}
            maxLength={20}
          />

          <Text style={styles.inputLabels}>Notes: </Text>
          <TextInput
            multiline
            style={styles.notesInput}
            onChangeText={this.saveGameNotes}
            value={this.state.gameNotes}
            placeholderTextColor={'#b5b5b5'}
            maxLength={200}
          />

          <Text style={styles.inputLabels}>Email Address: </Text>
          <TextInput
            style={styles.emailInput}
            placeholder="Enter Your Email Address"
            onChangeText={this.saveEmail}
            keyboardType="email-address"
            placeholderTextColor={'#b5b5b5'}
            maxLength={50}
          />
          <View style={styles.emailButtons}>
            <Button
              style={styles.inputButton}
              title="Send Game Stats"
              color="#448ccf"
              onPress={this.sendTheEmail}
            />
            <Button
              style={styles.inputButton}
              title="Cancel"
              color="#cc5500"
              onPress={this.props.hideReportView}
            />
          </View>
          {emailWarning}
          {gameSentAlert}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  emailButtons: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  notesInput: {
    height: 90,
    width: '93%',
    borderColor: '#ccc',
    backgroundColor: 'white',
    color: '#828282',
    borderWidth: 0.5,
    padding: 5,
    margin: 5,
  },
  emailInput: {
    height: 40,
    width: '93%',
    borderColor: '#ccc',
    backgroundColor: 'white',
    color: '#828282',
    borderWidth: 0.5,
    padding: 5,
    margin: 5,
  },
  inputContainer: {
    paddingTop: 50,
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    height: hp('100%'),
  },
  inputButton: {
    flexGrow: 1,
    marginTop: 15,
  },
  inputLabels: {
    fontSize: 13,
    color: '#474747',
    marginTop: 15,
    marginLeft: 5,
  },
  warningText: {
    color: '#00b3ff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  emailText: {
    color: '#289600',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
  },
  warningBox: {
    left: 10,
    top: 35,
  },
});

export default EmailInput;
