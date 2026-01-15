import React, { useState }from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../home/Home';
import Shop from '../shop/Shop';
import Message from '../message/Message';
import Mine from '../mine/Mine';

// import icon_tab_home_normal from '../../assets/icon_tab_home_normal.png';
// import icon_tab_home_selected from '../../assets/icon_tab_home_selected.png';
// import icon_tab_shop_normal from '../../assets/icon_tab_shop_normal.png';
// import icon_tab_shop_selected from '../../assets/icon_tab_shop_selected.png';
// import icon_tab_message_normal from '../../assets/icon_tab_message_normal.png';
// import icon_tab_message_selected from '../../assets/icon_tab_message_selected.png';
// import icon_tab_mine_normal from '../../assets/icon_tab_mine_normal.png';
// import icon_tab_mine_selected from '../../assets/icon_tab_mine_selected.png';

export default function MainTab() {
    const Tab = createBottomTabNavigator();

    const RedBookTabBar = ({ state, descriptors, navigation }:any) => {
        const { routes, index } = state;
        return (
            <View></View>
        )
    }

    return (
        <View style={styles.root}>
            <Tab.Navigator 
            // screenOptions={({route}) => {
            //     return {
            //         tabBarIcon: ({ focused, color, size }) => {
            //             let iconSource;
            //             if (route.name === 'Home') {
            //                 iconSource = focused ? icon_tab_home_selected : icon_tab_home_normal;
            //             } else if (route.name === 'Shop') {
            //                 iconSource = focused ? icon_tab_shop_selected : icon_tab_shop_normal;
            //             } else if (route.name === 'Message') {
            //                 iconSource = focused ? icon_tab_message_selected : icon_tab_message_normal;
            //             } else if (route.name === 'Mine') {
            //                 iconSource = focused ? icon_tab_mine_selected : icon_tab_mine_normal;
            //             }
            //             return <Image source={iconSource} style={{ width: 24, height: 24 }} />;
            //         }
            //     }
            // }}
            tabBar={props => <RedBookTabBar {...props} />}
            >
                <Tab.Screen name="Home" component={Home} options={{ title: '首页' }}/>
                <Tab.Screen name="Shop" component={Shop} options={{ title: '商城' }}/>
                <Tab.Screen name="Message" component={Message} options={{ title: '消息' }}/>
                <Tab.Screen name="Mine" component={Mine} options={{ title: '我的' }}/>
            </Tab.Navigator>
        </View>
        
    )
}   

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
    }
});