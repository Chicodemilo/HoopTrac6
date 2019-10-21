import React, {Component} from 'react';
import {Modal, View, Button, StyleSheet, Platform} from 'react-native';
import EmailInput from './EmailInput';

class SendReportContainer extends Component {
  constructor(props) {
    super(props);
    console.log(props.date);
    this.state = {
      showSendReport: props.showSendReport,
      hideReportView: props.hideReportView,
      finalStats: props.finalStats,
      gameTime: props.gameTime,
      gameId: props.gameId,
      gameName: props.gameName,
      gameDate: props.gameDate,
    };
  }

  render() {
    return (
      <Modal visible={this.props.showSendReport}>
        <View style={styles.reportButtons}>
          <Button
            title="Cancel"
            color="red"
            onPress={() => {
              this.state.hideReportView();
            }}
          />
        </View>
        <EmailInput
          finalStats={this.state.finalStats}
          gameTime={this.state.gameTime}
          gameId={this.state.gameId}
          gameName={this.state.gameName}
          gameDate={this.state.gameDate}
        />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  reportButtons: {
    marginTop: Platform.OS === 'ios' ? 40 : 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});

export default SendReportContainer;
