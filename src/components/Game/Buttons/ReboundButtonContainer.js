import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const ReboundButtonContainer = props => {
    return (
        <View style={styles.shotContainer}>
            <TouchableOpacity style={styles.shotButton} onPress={props.defensiveRebound}>
                <View>
                    <Text style={styles.shotText}>DEFENSIVE{"\n"}REBOUND</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shotButton} onPress={props.offensiveRebound}>
                <View>
                    <Text style={styles.shotText}>OFFENSIVE{"\n"}REBOUND</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    shotContainer: {
        width: "100%",
        marginTop: 0,
        marginBottom: 10,
        height: hp("6%"),
        borderBottomColor: "green",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start"
    },
    shotButton: {
        padding: 5,
        height: hp("6%"),
        backgroundColor: "#8a3afc",
        margin: 3,
        flexGrow: 1
    },
    shotText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "white"
    }
});

export default ReboundButtonContainer;
