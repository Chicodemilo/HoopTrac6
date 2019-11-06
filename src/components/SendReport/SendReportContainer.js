import React, {Component} from 'react';
import {Modal} from 'react-native';
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
      gameOpponent: props.gameOpponent,
      gameNotes: props.gameNotes,
      gameDate: props.gameDate,
    };
  }

  render() {
    return (
      <Modal visible={this.props.showSendReport}>
        <EmailInput
          finalStats={this.state.finalStats}
          gameTime={this.state.gameTime}
          gameId={this.state.gameId}
          gameName={this.state.gameName}
          gameOpponent={this.state.gameOpponent}
          gameNotes={this.state.gameNotes}
          gameDate={this.state.gameDate}
          hideReportView={this.state.hideReportView}
        />
      </Modal>
    );
  }
}

export default SendReportContainer;
