import React, { useState }from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeTab() {

    return (
        <View style={styles.root}>
            <Text>Home Tab</Text>
        </View>
    )
}   

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});