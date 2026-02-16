import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useLocalStore } from 'mobx-react';
import HomeStore from './HomeStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window')

export default function Home() {

    const store = useLocalStore(() => new HomeStore())

    useEffect(() => {
        store.requestHomeList()
    }, [])

    const renderItem = ({item, index}: {item: ArticleSimple, index: number}) => {
        return(
            <View style={styles.item}>
                
            </View>
        )
    }

    return (
        <View style={styles.root}>
            <FlatList style={styles.flatList} data={store.homeList} renderItem={renderItem} numColumns={2}/>
        </View>
    )
}   

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        width: '100%',
        height: '100%'
    },
    item: {
        width: SCREEN_WIDTH - 18 >> 2,
        height: 250,
        backgroundColor: 'green'
    }
});