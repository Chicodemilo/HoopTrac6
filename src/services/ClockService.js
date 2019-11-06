const ClockService = {
  returnYourNumber: function(num) {
    console.log('This is your number ' + num);
  },

  tick: function(gameActive, gameInProgress, activePlayers, gameTime) {
    if (gameActive == true && gameInProgress == true) {
      let newPlayers = {};
      Object.keys(activePlayers).map(key => {
        if (activePlayers[key].clockedIn == true) {
          activePlayers[key].timePlayedSec =
            activePlayers[key].timePlayedSec + 1;
          activePlayers[key].timePlayedMin = timeManipulation.secondsToHms(
            activePlayers[key].timePlayedSec,
          );
        }
        newPlayers[key] = activePlayers[key];
      });
      let newGameTime = gameTime + 1;
      let newGameMin = timeManipulation.secondsToHms(newGameTime);
      return {
        activePlayers: newPlayers,
        gameTime: newGameTime,
        gameMin: newGameMin,
      };
    } else {
      return false;
    }
  },
};

const timeManipulation = {
  secondsToHms: function(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);
    var hDisplay = h > 0 ? h + '' : '';
    var mDisplay = m > 0 ? m + '' : '00';
    var sDisplay = s > 0 ? s + '' : '00';
    if (sDisplay.length < 2) {
      sDisplay = '0' + sDisplay;
    }

    if (hDisplay > 0) {
      return hDisplay + ':' + mDisplay + ':' + sDisplay;
    }

    return mDisplay + ':' + sDisplay;
  },
};

export default ClockService;
