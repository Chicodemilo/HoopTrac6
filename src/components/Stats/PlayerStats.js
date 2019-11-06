import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import StatsItem from './StatsItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const playerStats = props => {
  const playerOutput = Object.keys(props.finalStats).map(key => (
    <StatsItem
      key={key}
      playerId={key}
      playerStats={props.finalStats[key]}
      gameTime={props.gameTime}
    />
  ));
  return (
    <ScrollView contentContainerStyle={{paddingBottom: 120}}>
      {playerOutput}
    </ScrollView>
  );
};

export default playerStats;
