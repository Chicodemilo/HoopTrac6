const styleObject = {
    gameView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "black",
        color: "green",
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 27,
        paddingBottom: 10
    },
    buttonBox: {
        flexDirection: "column",
        alignItems: "flex-start",
        height: "50%",
        width: "100%",
        borderTopColor: "green",
        borderTopWidth: 0.5
    },
    overlay: {
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        borderTopColor: "green",
        borderTopWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        opacity: 0.4
    },
    endGame: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "absolute",
        bottom: 15,
        padding: 10,
        width: "100%",
        borderTopColor: "green",
        borderTopWidth: 0.5
    },
    baseButton: {
        padding: 10
    },
    gameStats: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "stretch",
        position: "absolute",
        height: 243,
        bottom: 30,
        padding: 7,
        borderTopColor: "green",
        borderTopWidth: 0.5
    },
    activePlayerName: {
        color: "green",
        fontSize: 15,
        fontWeight: "bold",
        padding: 6
    },
    resetBox: {
        width: "100%",
        marginTop: 0,
        flexDirection: "row",
        padding: 2,
        alignItems: "flex-start"
    },
    resetButtons: {
        backgroundColor: "#212121",
        margin: 2,
        justifyContent: "center",
        alignItems: "center",
        width: "50%"
    },
    resetText: {
        color: "#ddd",
        padding: 4,
        fontSize: 10
    },
    warningText: {
        color: "#00b3ff",
        fontWeight: "bold",
        fontSize: 14
    },
    warningBox: {
        position: "absolute",
        right: 5,
        top: 5
    }
};

export default styleObject;
