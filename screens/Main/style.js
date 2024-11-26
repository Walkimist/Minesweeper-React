import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        color: '#ccd8e6',
        fontSize: 32
    },
    uiButton: {
        marginTop: 25,
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccd8e6',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 16,
    }
});

export default styles