import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ListItem from '../ListItem/ListItem';

const playerList = props => {
  const playerOutput = Object.keys(props.playerObj).map(key => (
    <ListItem
      key={key}
      playerName={props.playerObj[key].name}
      onItemPressed={() => {
        props.onItemDeleted(key);
      }}
      toggleCheckIn={() => {
        props.onPlayerCheckIn(key);
      }}
    />
  ));
  return <ScrollView style={styles.listContainer}>{playerOutput}</ScrollView>;
};

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    marginTop: 10,
  },
});

export default playerList;
