const StatsService = {
  returnYourNumber: function(number) {
    return 'Your Number ' + number;
  },

  calculateFinalStats: function(finalStats, gameSeconds) {
    //(PTS + REB + AST + STL + BLK − ((FGA − FGM) + (FTA − FTM) + TO))

    const min = (gameSeconds / 60).toFixed(2);

    Object.keys(finalStats).map(key => {
      let percentOfGamePlayed = 0;

      if (gameSeconds != 0) {
        percentOfGamePlayed = (
          (finalStats[key].timePlayedSec / gameSeconds) *
          100
        ).toFixed(0);
      }

      let assistsPerMin = 0;
      let reboundsPerMin = 0;
      let pointsPerMin = 0;
      let turnOversPerMin = 0;
      let foulsPerMin = 0;
      if (min != 0) {
        assistsPerMin = (finalStats[key].assists / min).toFixed(3);
        reboundsPerMin = (finalStats[key].rebounds / min).toFixed(3);
        pointsPerMin = (finalStats[key].points / min).toFixed(3);
        turnOversPerMin = (finalStats[key].turnOvers / min).toFixed(3);
        foulsPerMin = (finalStats[key].foulsCommitted / min).toFixed(3);
      }

      const shotDiff = finalStats[key].shotAttempts - finalStats[key].shotsMade;
      const ftDiff =
        finalStats[key].freeThrowAttempts - finalStats[key].freeThrowMade;

      const efficiencyRating =
        finalStats[key].points +
        finalStats[key].rebounds +
        finalStats[key].assists +
        finalStats[key].steals +
        finalStats[key].blocks -
        (shotDiff - ftDiff + finalStats[key].turnOvers);

      let assistToTurnOver = 0;
      if (finalStats[key].turnOvers != 0) {
        assistToTurnOver = (
          finalStats[key].assists / finalStats[key].turnOvers
        ).toFixed(3);
      }

      finalStats[key].efficiencyRating = efficiencyRating;
      finalStats[key].assistToTurnOver = assistToTurnOver;
      finalStats[key].percentOfGamePlayed = percentOfGamePlayed;
      finalStats[key].pointsPerMin = pointsPerMin;
      finalStats[key].reboundsPerMin = reboundsPerMin;
      finalStats[key].assistsPerMin = assistsPerMin;
      finalStats[key].turnOversPerMin = turnOversPerMin;
      finalStats[key].foulsPerMin = foulsPerMin;
    });
    return finalStats;
  },

  updateStat: function(activePlayers, activePlayerKey, action, direction) {
    switch (action) {
      case 'shotMadeTwo':
        return this.shotMade(activePlayers, activePlayerKey, 2, direction);

      case 'shotMadeThree':
        return this.shotMade(activePlayers, activePlayerKey, 3, direction);

      case 'shotMissTwo':
        return this.shotMissed(activePlayers, activePlayerKey, 2, direction);

      case 'shotMissThree':
        return this.shotMissed(activePlayers, activePlayerKey, 3, direction);

      case 'defensiveRebound':
        return this.defensiveRebound(activePlayers, activePlayerKey, direction);

      case 'offensiveRebound':
        return this.offensiveRebound(activePlayers, activePlayerKey, direction);

      case 'freeThrowMade':
        return this.freeThrowMade(activePlayers, activePlayerKey, direction);

      case 'freeThrowMiss':
        return this.freeThrowMiss(activePlayers, activePlayerKey, direction);

      case 'assist':
        return this.assist(activePlayers, activePlayerKey, direction);

      case 'block':
        return this.block(activePlayers, activePlayerKey, direction);

      case 'fouls':
        return this.fouls(activePlayers, activePlayerKey, direction);

      case 'steals':
        return this.steals(activePlayers, activePlayerKey, direction);

      case 'turnOvers':
        return this.turnOvers(activePlayers, activePlayerKey, direction);

      default:
        break;
    }
  },

  shotMade: function(activePlayers, activePlayerKey, points, direction) {
    // if (direction == 1) {
    //   activePlayers[activePlayerKey].points =
    //     activePlayers[activePlayerKey].points + points;
    // } else {
    //   if (activePlayers[activePlayerKey].twoPointMade > 1) {
    //     let checkedPoints = this.negativeCheck(
    //       activePlayers[activePlayerKey].points - points,
    //     );
    //     activePlayers[activePlayerKey].points = checkedPoints;
    //   }
    // }

    if (points == 2) {
      if (direction == 1) {
        activePlayers[activePlayerKey].points =
          activePlayers[activePlayerKey].points + points;

        let shotMade = this.negativeCheck(
          activePlayers[activePlayerKey].shotsMade + direction,
        );
        activePlayers[activePlayerKey].shotsMade = shotMade;
      } else {
        if (activePlayers[activePlayerKey].twoPointMade > 0) {
          let checkedPoints = this.negativeCheck(
            activePlayers[activePlayerKey].points - points,
          );
          activePlayers[activePlayerKey].points = checkedPoints;
        }

        let shotMade = this.negativeCheck(
          activePlayers[activePlayerKey].shotsMade + direction,
        );
        activePlayers[activePlayerKey].shotsMade = shotMade;
      }

      let checked2ptAtt = this.negativeCheck(
        activePlayers[activePlayerKey].twoPointAttempts + direction,
      );
      activePlayers[activePlayerKey].twoPointAttempts = checked2ptAtt;

      let checked2ptMade = this.negativeCheck(
        activePlayers[activePlayerKey].twoPointMade + direction,
      );
      activePlayers[activePlayerKey].twoPointMade = checked2ptMade;

      activePlayers[activePlayerKey].twoPointPercentage = this.shootingPercent(
        activePlayers[activePlayerKey].twoPointMade,
        activePlayers[activePlayerKey].twoPointAttempts,
      );
    } else {
      if (direction == 1) {
        activePlayers[activePlayerKey].points =
          activePlayers[activePlayerKey].points + points;
        let shotMade = this.negativeCheck(
          activePlayers[activePlayerKey].shotsMade + direction,
        );
        activePlayers[activePlayerKey].shotsMade = shotMade;
      } else {
        if (activePlayers[activePlayerKey].threePointMade > 0) {
          let checkedPoints = this.negativeCheck(
            activePlayers[activePlayerKey].points - points,
          );
          activePlayers[activePlayerKey].points = checkedPoints;
          let shotMade = this.negativeCheck(
            activePlayers[activePlayerKey].shotsMade + direction,
          );
          activePlayers[activePlayerKey].shotsMade = shotMade;
        }
      }

      let checked3ptAtt = this.negativeCheck(
        activePlayers[activePlayerKey].threePointAttempts + direction,
      );
      activePlayers[activePlayerKey].threePointAttempts = checked3ptAtt;

      let checked3ptMade = this.negativeCheck(
        activePlayers[activePlayerKey].threePointMade + direction,
      );
      activePlayers[activePlayerKey].threePointMade = checked3ptMade;

      activePlayers[
        activePlayerKey
      ].threePointPercentage = this.shootingPercent(
        activePlayers[activePlayerKey].threePointMade,
        activePlayers[activePlayerKey].threePointAttempts,
      );
    }

    activePlayers[activePlayerKey].shotAttempts =
      activePlayers[activePlayerKey].shotsMade +
      activePlayers[activePlayerKey].shotsMiss;

    activePlayers[activePlayerKey].shootingPercentage = this.shootingPercent(
      activePlayers[activePlayerKey].shotsMade,
      activePlayers[activePlayerKey].shotAttempts,
    );

    return activePlayers;
  },

  shotMissed: function(activePlayers, activePlayerKey, points, direction) {
    let shotMiss = this.negativeCheck(
      activePlayers[activePlayerKey].shotsMiss + direction,
    );
    activePlayers[activePlayerKey].shotsMiss = shotMiss;

    activePlayers[activePlayerKey].shotAttempts =
      activePlayers[activePlayerKey].shotsMiss +
      activePlayers[activePlayerKey].shotsMade;

    if (points == 2) {
      let this2ptMiss = this.negativeCheck(
        activePlayers[activePlayerKey].twoPointMiss + direction,
      );
      activePlayers[activePlayerKey].twoPointMiss = this2ptMiss;

      activePlayers[activePlayerKey].twoPointAttempts =
        activePlayers[activePlayerKey].twoPointMiss +
        activePlayers[activePlayerKey].twoPointMade;

      activePlayers[activePlayerKey].twoPointPercentage = this.shootingPercent(
        activePlayers[activePlayerKey].twoPointMade,
        activePlayers[activePlayerKey].twoPointAttempts,
      );
    } else {
      let this3ptMiss = this.negativeCheck(
        activePlayers[activePlayerKey].threePointMiss + direction,
      );
      activePlayers[activePlayerKey].threePointMiss = this3ptMiss;

      activePlayers[activePlayerKey].threePointAttempts =
        activePlayers[activePlayerKey].threePointMiss +
        activePlayers[activePlayerKey].threePointMade;

      activePlayers[
        activePlayerKey
      ].threePointPercentage = this.shootingPercent(
        activePlayers[activePlayerKey].threePointMade,
        activePlayers[activePlayerKey].threePointAttempts,
      );
    }

    activePlayers[activePlayerKey].shootingPercentage = this.shootingPercent(
      activePlayers[activePlayerKey].shotsMade,
      activePlayers[activePlayerKey].shotAttempts,
    );

    return activePlayers;
  },

  defensiveRebound: function(activePlayers, activePlayerKey, direction) {
    let defReb = this.negativeCheck(
      activePlayers[activePlayerKey].defRebounds + direction,
    );
    activePlayers[activePlayerKey].defRebounds = defReb;

    let totReb = this.negativeCheck(
      activePlayers[activePlayerKey].rebounds + direction,
    );
    activePlayers[activePlayerKey].rebounds = totReb;

    return activePlayers;
  },

  offensiveRebound: function(activePlayers, activePlayerKey, direction) {
    let offReb = this.negativeCheck(
      activePlayers[activePlayerKey].offRebounds + direction,
    );
    activePlayers[activePlayerKey].offRebounds = offReb;

    let totReb = this.negativeCheck(
      activePlayers[activePlayerKey].rebounds + direction,
    );
    activePlayers[activePlayerKey].rebounds = totReb;

    return activePlayers;
  },

  freeThrowMade: function(activePlayers, activePlayerKey, direction) {
    if (direction == 1) {
      let thisPoints = this.negativeCheck(
        activePlayers[activePlayerKey].points + direction,
      );
      activePlayers[activePlayerKey].points = thisPoints;
    } else {
      if (activePlayers[activePlayerKey].freeThrowMade > 0) {
        let thisPoints = this.negativeCheck(
          activePlayers[activePlayerKey].points + direction,
        );
        activePlayers[activePlayerKey].points = thisPoints;
      }
    }

    let freethrowMade = this.negativeCheck(
      activePlayers[activePlayerKey].freeThrowMade + direction,
    );
    activePlayers[activePlayerKey].freeThrowMade = freethrowMade;

    activePlayers[activePlayerKey].freeThrowAttempts =
      activePlayers[activePlayerKey].freeThrowMade +
      activePlayers[activePlayerKey].freeThrowMiss;

    activePlayers[activePlayerKey].freeThrowPercentage = this.shootingPercent(
      activePlayers[activePlayerKey].freeThrowMade,
      activePlayers[activePlayerKey].freeThrowAttempts,
    );

    return activePlayers;
  },

  freeThrowMiss: function(activePlayers, activePlayerKey, direction) {
    let freeThrowMiss = this.negativeCheck(
      activePlayers[activePlayerKey].freeThrowMiss + direction,
    );
    activePlayers[activePlayerKey].freeThrowMiss = freeThrowMiss;

    activePlayers[activePlayerKey].freeThrowAttempts =
      activePlayers[activePlayerKey].freeThrowMiss +
      activePlayers[activePlayerKey].freeThrowMade;

    activePlayers[activePlayerKey].freeThrowPercentage = this.shootingPercent(
      activePlayers[activePlayerKey].freeThrowMade,
      activePlayers[activePlayerKey].freeThrowAttempts,
    );

    return activePlayers;
  },

  assist: function(activePlayers, activePlayerKey, direction) {
    let thisAssist = this.negativeCheck(
      activePlayers[activePlayerKey].assists + direction,
    );
    activePlayers[activePlayerKey].assists = thisAssist;

    return activePlayers;
  },

  block: function(activePlayers, activePlayerKey, direction) {
    let thisBlock = this.negativeCheck(
      activePlayers[activePlayerKey].blocks + direction,
    );
    activePlayers[activePlayerKey].blocks = thisBlock;
    return activePlayers;
  },

  fouls: function(activePlayers, activePlayerKey, direction) {
    let thisFouls = this.negativeCheck(
      activePlayers[activePlayerKey].foulsCommitted + direction,
    );
    activePlayers[activePlayerKey].foulsCommitted = thisFouls;

    return activePlayers;
  },

  steals: function(activePlayers, activePlayerKey, direction) {
    let thisSteals = this.negativeCheck(
      activePlayers[activePlayerKey].steals + direction,
    );
    activePlayers[activePlayerKey].steals = thisSteals;

    return activePlayers;
  },

  turnOvers: function(activePlayers, activePlayerKey, direction) {
    let thisTurnOvers = this.negativeCheck(
      activePlayers[activePlayerKey].turnOvers + direction,
    );
    activePlayers[activePlayerKey].turnOvers = thisTurnOvers;

    return activePlayers;
  },

  shootingPercent(made, attempts) {
    let shootingPercent = 0;
    if (attempts > 0) {
      shootingPercent = (made / attempts) * 100;
      shootingPercent = shootingPercent.toFixed(1);
    }
    return shootingPercent;
  },

  negativeCheck(stat) {
    if (stat < 0) {
      return 0;
    } else {
      return stat;
    }
  },

  resetPlayerStats(activePlayers, activePlayerKey, activePlayerName) {
    const resetStats = {
      key: activePlayerKey,
      name: activePlayerName,
      active: true,
      clockedIn: false,
      timePlayedSec: 0,
      timePlayedMin: '0:00',
      percentOfGamePlayed: 0,
      points: 0,
      shotAttempts: 0,
      shotsMade: 0,
      shotsMiss: 0,
      shootingPercentage: 0,
      twoPointAttempts: 0,
      twoPointMade: 0,
      twoPointMiss: 0,
      twoPointPercentage: 0,
      threePointAttempts: 0,
      threePointMade: 0,
      threePointMiss: 0,
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
      freeThrowMiss: 0,
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

    activePlayers[activePlayerKey] = resetStats;
    return activePlayers;
  },

  undoButtonHandler(activePlayers, oldActivePlayers) {
    let newPlayers = {};
    Object.keys(activePlayers).map(thiskey => {
      newPlayers[thiskey] = {
        key: activePlayers[thiskey].key,
        name: activePlayers[thiskey].name,
        active: activePlayers[thiskey].active,
        clockedIn: activePlayers[thiskey].clockedIn,
        timePlayedSec: activePlayers[thiskey].timePlayedSec,
        timePlayedMin: activePlayers[thiskey].timePlayedMin,
        percentOfGamePlayed: activePlayers[thiskey].percentOfGamePlayed,
        points: oldActivePlayers[thiskey].points,
        shotAttempts: oldActivePlayers[thiskey].shotAttempts,
        twoPointAttempts: oldActivePlayers[thiskey].twoPointAttempts,
        threePointAttempts: oldActivePlayers[thiskey].threePointAttempts,
        shotsMade: oldActivePlayers[thiskey].shotsMade,
        shotsMiss: oldActivePlayers[thiskey].shotsMiss,
        shootingPercentage: oldActivePlayers[thiskey].shootingPercentage,
        twoPointMade: oldActivePlayers[thiskey].twoPointMade,
        twoPointMiss: oldActivePlayers[thiskey].twoPointMiss,
        twoPointPercentage: oldActivePlayers[thiskey].twoPointPercentage,
        threePointMade: oldActivePlayers[thiskey].threePointMade,
        threePointMiss: oldActivePlayers[thiskey].threePointMiss,
        threePointPercentage: oldActivePlayers[thiskey].threePointPercentage,
        rebounds: oldActivePlayers[thiskey].rebounds,
        offRebounds: oldActivePlayers[thiskey].offRebounds,
        defRebounds: oldActivePlayers[thiskey].defRebounds,
        assists: oldActivePlayers[thiskey].assists,
        blocks: oldActivePlayers[thiskey].blocks,
        turnOvers: oldActivePlayers[thiskey].turnOvers,
        foulsCommitted: oldActivePlayers[thiskey].foulsCommitted,
        steals: oldActivePlayers[thiskey].steals,
        freeThrowAttempts: oldActivePlayers[thiskey].freeThrowAttempts,
        freeThrowMade: oldActivePlayers[thiskey].freeThrowMade,
        freeThrowMiss: oldActivePlayers[thiskey].freeThrowMiss,
        freeThrowPercentage: oldActivePlayers[thiskey].freeThrowPercentage,
        pointsPerMin: oldActivePlayers[thiskey].pointsPerMin,
        shotsPerMin: oldActivePlayers[thiskey].shotsPerMin,
        reboundsPerMin: oldActivePlayers[thiskey].reboundsPerMin,
        assistsPerMin: oldActivePlayers[thiskey].assistsPerMin,
        blocksPerMin: oldActivePlayers[thiskey].blocksPerMin,
        turnOversPerMin: oldActivePlayers[thiskey].turnOversPerMin,
        foulsPerMin: oldActivePlayers[thiskey].foulsPerMin,
        efficiencyRating: oldActivePlayers[thiskey].efficiencyRating,
        assistToTurnOver: oldActivePlayers[thiskey].assistToTurnOver,
      };
    });
    return newPlayers;
  },
};

export default StatsService;
