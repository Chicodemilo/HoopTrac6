import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

const FoulButtonContainer = props => {
    return (
        <View style={styles.shotContainer}>
            <TouchableOpacity style={styles.shotButton} onPress={props.fouls}>
                <View>
                    <Text style={styles.shotText}>
                        FOUL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Text>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.shotButton} onPress={props.technicals}>
                <View>
                    <Text style={styles.shotText}>TECHNICAL</Text>
                </View>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.shotButton} onPress={props.turnOvers}>
                <View>
                    <Text style={styles.shotText}>TURNOVER</Text>
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
        backgroundColor: "#6e0107",
        margin: 3,
        flex: 1
    },
    shotText: {
        fontSize: 13,
        fontWeight: "bold",
        color: "white"
    }
});

export default FoulButtonContainer;
