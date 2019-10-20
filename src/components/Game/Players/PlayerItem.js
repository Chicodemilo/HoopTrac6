import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const playerItem = props => (
    <TouchableOpacity
        onPress={() => props.onPlayerPressed(props.playerId, props.playerName)}
        style={props.active ? styles.activePlayer : styles.inActivePlayer}
    >
        <View>
            <Text style={styles.playerText}>{props.playerName}</Text>
            <Text style={styles.clockText}>{props.checkedIn ? "IN" : "OUT"}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    activePlayer: {
        padding: 5,
        height: hp("6%"),
        backgroundColor: "#e36002",
        margin: 5,
        flexGrow: 1
    },
    inActivePlayer: {
        padding: 5,
        backgroundColor: "#693917",
        height: hp("6%"),
        margin: 5,
        flexGrow: 1
    },

    playerText: {
        fontSize: 13,
        fontWeight: "bold",
        color: "white"
    },
    clockText: {
        fontSize: 11,
        color: "black"
    }
});

export default playerItem;
