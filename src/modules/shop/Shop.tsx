import React, { useState }from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Shop() {

    return (
        <View style={styles.root}>
            <Text>Shop</Text>
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