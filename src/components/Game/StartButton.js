import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

const startButton = props => (
    <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={props.startTheGame}
            disabled={props.allowGame}
            style={this.buttonStyle(props.allowGame)}
        >
            <View style={styles.button}>
                <Text style={this.buttonTextStyle(props.allowGame)}>Start Game</Text>
            </View>
        </TouchableOpacity>
    </View>
);

buttonStyle = allow => {
    thisStyle = allow ? styles.disableButton : styles.startButton;
    return thisStyle;
};

buttonTextStyle = allow => {
    thisStyle = allow ? styles.disableButtonText : styles.startButtonText;
    return thisStyle;
};

const styles = StyleSheet.create({
    buttonContainer: {
        // flex: 1,
        width: "100%",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    startButton: {
        width: "100%",
        padding: 12,
        alignSelf: "stretch",
        backgroundColor: "#cc5500",
        alignItems: "center"
    },
    disableButton: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#rgba(0, 0, 0, 0.3)",
        padding: 12
    },
    startButtonText: {
        color: "white"
    },
    disableButtonText: {
        color: "#787878"
    }
});

export default startButton;
