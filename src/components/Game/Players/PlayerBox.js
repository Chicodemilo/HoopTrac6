import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import PlayerItem from "./PlayerItem";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const playerBox = props => {
    const playerOutput = Object.keys(props.gamePlayers).map(key => (
        <PlayerItem
            key={key}
            playerId={key}
            playerName={props.gamePlayers[key].name}
            active={props.gamePlayers[key].active}
            checkedIn={props.gamePlayers[key].clockedIn}
            onPlayerPressed={props.makeActivePlayer}
        />
    ));
    return <View style={styles.playerContainer}>{playerOutput}</View>;
};

const styles = StyleSheet.create({
    playerContainer: {
        height: hp("8%"),
        marginTop: 0,
        marginBottom: 3,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start"
    }
});

export default playerBox;
