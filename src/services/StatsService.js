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

  updateStat: function(activePlayers, activePlayerKey, action) {
    switch (action) {
      case 'shotMadeTwo':
        return this.shotMade(activePlayers, activePlayerKey, 2);

      case 'shotMadeThree':
        return this.shotMade(activePlayers, activePlayerKey, 3);

      case 'shotMissTwo':
        return this.shotMissed(activePlayers, activePlayerKey, 2);

      case 'shotMissThree':
        return this.shotMissed(activePlayers, activePlayerKey, 3);

      case 'defensiveRebound':
        return this.defensiveRebound(activePlayers, activePlayerKey);

      case 'offensiveRebound':
        return this.offensiveRebound(activePlayers, activePlayerKey);

      case 'freeThrowMade':
        return this.freeThrowMade(activePlayers, activePlayerKey);

      case 'freeThrowMiss':
        return this.freeThrowMiss(activePlayers, activePlayerKey);

      case 'assist':
        return this.assist(activePlayers, activePlayerKey);

      case 'block':
        return this.block(activePlayers, activePlayerKey);

      case 'fouls':
        return this.fouls(activePlayers, activePlayerKey);

      case 'steals':
        return this.steals(activePlayers, activePlayerKey);

      case 'turnOvers':
        return this.turnOvers(activePlayers, activePlayerKey);

      default:
        break;
    }
  },

  shotMade: function(activePlayers, activePlayerKey, points) {
    activePlayers[activePlayerKey].points =
      activePlayers[activePlayerKey].points + points;

    activePlayers[activePlayerKey].shotAttempts =
      activePlayers[activePlayerKey].shotAttempts + 1;

    if (points == 2) {
      activePlayers[activePlayerKey].twoPointAttempts =
        activePlayers[activePlayerKey].twoPointAttempts + 1;

      activePlayers[activePlayerKey].twoPointMade =
        activePlayers[activePlayerKey].twoPointMade + 1;
    } else {
      activePlayers[activePlayerKey].threePointAttempts =
        activePlayers[activePlayerKey].threePointAttempts + 1;

      activePlayers[activePlayerKey].threePointMade =
        activePlayers[activePlayerKey].threePointMade + 1;

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

    activePlayers[activePlayerKey].shotsMade =
      activePlayers[activePlayerKey].shotsMade + 1;

    return activePlayers;
  },

  shotMissed: function(activePlayers, activePlayerKey, points) {
    activePlayers[activePlayerKey].shotAttempts =
      activePlayers[activePlayerKey].shotAttempts + 1;

    if (points == 2) {
      activePlayers[activePlayerKey].twoPointAttempts =
        activePlayers[activePlayerKey].twoPointAttempts + 1;
    } else {
      activePlayers[activePlayerKey].threePointAttempts =
        activePlayers[activePlayerKey].threePointAttempts + 1;

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

  defensiveRebound: function(activePlayers, activePlayerKey) {
    activePlayers[activePlayerKey].defRebounds =
      activePlayers[activePlayerKey].defRebounds + 1;

    activePlayers[activePlayerKey].rebounds =
      activePlayers[activePlayerKey].rebounds + 1;

    return activePlayers;
  },

  offensiveRebound: function(activePlayers, activePlayerKey) {
    activePlayers[activePlayerKey].offRebounds =
      activePlayers[activePlayerKey].offRebounds + 1;

    activePlayers[activePlayerKey].rebounds =
      activePlayers[activePlayerKey].rebounds + 1;

    return activePlayers;
  },

  freeThrowMade: function(activePlayers, activePlayerKey) {
    activePlayers[activePlayerKey].freeThrowMade =
      activePlayers[activePlayerKey].freeThrowMade + 1;

    activePlayers[activePlayerKey].freeThrowAttempts =
      activePlayers[activePlayerKey].freeThrowAttempts + 1;

    activePlayers[activePlayerKey].points =
      activePlayers[activePlayerKey].points + 1;

    activePlayers[activePlayerKey].freeThrowPercentage = this.shootingPercent(
      activePlayers[activePlayerKey].freeThrowMade,
      activePlayers[activePlayerKey].freeThrowAttempts,
    );

    return activePlayers;
  },

  freeThrowMiss: function(activePlayers, activePlayerKey) {
    activePlayers[activePlayerKey].freeThrowAttempts =
      activePlayers[activePlayerKey].freeThrowAttempts + 1;

    activePlayers[activePlayerKey].freeThrowPercentage = this.shootingPercent(
      activePlayers[activePlayerKey].freeThrowMade,
      activePlayers[activePlayerKey].freeThrowAttempts,
    );

    return activePlayers;
  },

  assist: function(activePlayers, activePlayerKey) {
    activePlayers[activePlayerKey].assists =
      activePlayers[activePlayerKey].assists + 1;

    return activePlayers;
  },

  block: function(activePlayers, activePlayerKey) {
    activePlayers[activePlayerKey].blocks =
      activePlayers[activePlayerKey].blocks + 1;

    return activePlayers;
  },

  fouls: function(activePlayers, activePlayerKey) {
    activePlayers[activePlayerKey].foulsCommitted =
      activePlayers[activePlayerKey].foulsCommitted + 1;

    return activePlayers;
  },

  steals: function(activePlayers, activePlayerKey) {
    activePlayers[activePlayerKey].steals =
      activePlayers[activePlayerKey].steals + 1;

    return activePlayers;
  },

  turnOvers: function(activePlayers, activePlayerKey) {
    activePlayers[activePlayerKey].turnOvers =
      activePlayers[activePlayerKey].turnOvers + 1;

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
        shootingPercentage: oldActivePlayers[thiskey].shootingPercentage,
        twoPointMade: oldActivePlayers[thiskey].twoPointMade,
        threePointMade: oldActivePlayers[thiskey].threePointMade,
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
