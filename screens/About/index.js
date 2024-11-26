import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import styles from './style';

const About = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About</Text>
            <Text style={styles.subText}>Made by</Text>
            <Text style={styles.text}>Paulo Vitor Bernardi Theobald</Text>
            <Text style={styles.subText}>Special Thanks</Text>
            <Text style={styles.text}>Victor Manuel Zerefos de Oliveira</Text>
        </View>
    );
};

export default About;