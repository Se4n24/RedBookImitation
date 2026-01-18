import React, { use, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import icon_logo_main from '../../assets/icon_main_logo.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { load } from '../../utils/Storage';

export default () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        setTimeout(() => {
            getUserInfo()
        }, 2000);
    }, []);

    const getUserInfo = async() => {
        const cacheUserInfo = await load('userInfo')
        console.log("cacheUserInfo", cacheUserInfo)
        if(cacheUserInfo && JSON.parse(cacheUserInfo)){
            startHome()
        }else{
            startLogin()
        }
    }

    const startHome = () => {
        navigation.replace('HomeTab')
    }

    const startLogin = () => {
        navigation.replace('Login');
    }

    return (
        <View style={styles.root}>
            <Image style={styles.logo_main} source={icon_logo_main} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo_main: {
        marginTop: 200,
        height: 100, 
        resizeMode: 'contain',
    }
});