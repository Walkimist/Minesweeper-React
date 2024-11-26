import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './style';

const Main = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Minesweeper</Text>

            <View style={styles.uiButtonsContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Game")}
                    style={styles.uiButton}
                ><Text style={styles.buttonText}>Play</Text></TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("About")}
                    style={styles.uiButton}
                ><Text style={styles.buttonText}>About</Text></TouchableOpacity>
            </View>
        </View>
    );
};

export default Main;