import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const statsItem = props => {
  return (
    <View style={styles.playerStats}>
      <View style={styles.nameBox}>
        <Text style={styles.playerText}>{props.playerStats.name}</Text>
      </View>
      <Text style={styles.playerTextSmall}>
        Total Game Time: {props.gameTime}
      </Text>
      <Text style={styles.playerTextSmall}>
        Player Minutes: {props.playerStats.timePlayedMin}
      </Text>
      <Text style={styles.playerTextSmall}>
        Percent Of Game Played: {props.playerStats.percentOfGamePlayed}%
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Points: {props.playerStats.points}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Rebounds: {props.playerStats.rebounds}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Assist: {props.playerStats.assists}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Blocks: {props.playerStats.blocks}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Steals: {props.playerStats.steals}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Turn Overs: {props.playerStats.turnOvers}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Fouls: {props.playerStats.foulsCommitted}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Shot Att: {props.playerStats.shotAttempts} &nbsp; Made:&nbsp;
        {props.playerStats.shotsMade} &nbsp;&nbsp;
        {props.playerStats.shootingPercentage}%
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; 3pt Att: {props.playerStats.threePointAttempts} &nbsp;
        Made:&nbsp;
        {props.playerStats.threePointMade} &nbsp;&nbsp;
        {props.playerStats.threePointPercentage}%
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; FreeThrow Att: {props.playerStats.freeThrowAttempts} &nbsp;
        Made:&nbsp;
        {props.playerStats.freeThrowMade} &nbsp;&nbsp;
        {props.playerStats.freeThrowPercentage}%
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Off Reb: {props.playerStats.offRebounds} &nbsp; Def Reb:&nbsp;
        {props.playerStats.defRebounds}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Assist To TurnOver Ratio: {props.playerStats.assistToTurnOver}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Points Per Minute Played: {props.playerStats.pointsPerMin}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Reb Per Minute Played: {props.playerStats.reboundsPerMin}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; Assist Per Minute Played: {props.playerStats.assistsPerMin}
      </Text>
      <Text style={styles.playerTextSmall}>
        &bull; NBA Efficiency Rating: {props.playerStats.efficiencyRating}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  playerStats: {
    padding: 10,
    height: 505,
    backgroundColor: '#fcfcfc',
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  nameBox: {
    width: '100%',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#707070',
    marginBottom: 5,
  },
  playerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5e5e5e',
    textAlign: 'center',
    width: '100%',
  },
  playerTextSmall: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 4,
  },
});

export default statsItem;
