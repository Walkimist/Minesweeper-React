import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    board: {
        flexDirection: "column",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
    },
    cell: {
        width: 40,
        height: 40,
        backgroundColor: "#3b3e69",
        justifyContent: "center",
        alignItems: "center",
        margin: 1,
        borderWidth: 1,
        borderColor: '#3b3e69',
        borderRadius: 2
    },
    revealedCell: {
        backgroundColor: "#212135",
    },
    bombCell: {
        backgroundColor: "#802d2f"
    },
    cellText: {
        fontWeight: 'bold',
        color: '#d3dded'
    },
    restartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#3b3e69',
        borderRadius: 10,
        marginBottom: 6
    },
    restartButtonText: {
        fontWeight: 'bold',
        marginTop: -8,
        fontSize: 32,
        color: '#ccd8e6'
    },
    timerContainer: {
        width: '91%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    timer: {
        color: '#ccd8e6',
        fontSize: 16,
        fontWeight: 'bold'
    },
    wonTimer: {
        color: '#3d8f62',
    },
    pbTimer: {
        color: '#a9b0c4',
        fontSize: 16,
    },
    flag: {
        color: '#ccd8e6',
        fontSize: 18,
    },
});

export default styles;