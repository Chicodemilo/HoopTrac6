import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const AssistButtonContainer = props => {
    return (
        <View style={styles.shotContainer}>
            <TouchableOpacity style={styles.shotButton} onPress={props.assist}>
                <View>
                    <Text style={styles.shotText}>ASSIST</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shotButton} onPress={props.steal}>
                <View>
                    <Text style={styles.shotText}>STEAL</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shotButton} onPress={props.block}>
                <View>
                    <Text style={styles.shotText}>BLOCK</Text>
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
        height: hp("6%"),
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#0a4701",
        margin: 3,
        flex: 1
    },
    shotText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "white"
    }
});

export default AssistButtonContainer;
