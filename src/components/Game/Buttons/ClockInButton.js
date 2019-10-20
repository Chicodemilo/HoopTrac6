import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const clockInButton = props => (
    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => props.toggleClockIn()} style={styles.clockInButton}>
            <View>
                <Text style={styles.clockInText}>
                    CLOCK {props.activeClockedIn ? "OUT" : "IN"} PLAYER
                </Text>
            </View>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        marginBottom: 10,
        height: hp("6%"),
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start"
    },
    clockInButton: {
        width: "100%",
        padding: 5,
        height: hp("6%"),
        backgroundColor: "#c2020c",
        flexGrow: 1
    },
    clockInText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "white"
    }
});

export default clockInButton;
