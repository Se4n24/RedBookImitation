import React, { useState }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { remove } from '../../utils/Storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export default function Mine() {

    const navigation = useNavigation<StackNavigationProp<any>>();

    return (
        <View style={styles.root}>
            <Button title='logout' onPress={async() => {
                try{
                    await remove('userInfo')
                    navigation.replace('Login')
                }catch(e){
                    console.log("logout error", e)
                }
            }} />
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