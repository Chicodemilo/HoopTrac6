import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const FreeThrowButtonContainer = props => {
    return (
        <View style={styles.shotContainer}>
            <TouchableOpacity style={styles.shotButton} onPress={props.freeThrowMade}>
                <View>
                    <Text style={styles.shotText}>FREETHROW{"\n"}MADE</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shotButton} onPress={props.freeThrowMiss}>
                <View>
                    <Text style={styles.shotText}>FREETHROW{"\n"}MISS</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    shotContainer: {
        width: "100%",
        height: hp("6%"),
        marginTop: 0,
        marginBottom: 10,
        borderBottomColor: "green",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "flex-start"
    },
    shotButton: {
        padding: 5,
        height: hp("6%"),
        backgroundColor: "#00a6ff",
        margin: 3,
        flexGrow: 1
    },
    shotText: {
        fontSize: 10,
        fontWeight: "bold",
        color: "white"
    }
});

export default FreeThrowButtonContainer;
