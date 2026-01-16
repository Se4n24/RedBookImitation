import React, { useState }from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';
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
import icon_tab_publish from '../../assets/icon_tab_publish.png';

export default function MainTab() {
    const Tab = createBottomTabNavigator();

    const onPublishPress = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                quality: 1,
                includeBase64: false,
            },
            (res: any) => {
                const { assets } = res;
                if (!assets?.length) {
                    console.log('选择的图片为空');
                    return
                }
                const { uri, width, height, fileName, fileSize, type } = assets[0];
                console.log('选择的图片信息：', uri, width, height, fileName, fileSize, type);
            }
        )
    }

    const RedBookTabBar = ({ state, descriptors, navigation }:any) => {
        const { routes, index } = state;
        return (
            <View style={styles.tabBarContainer}>
                {routes.map((route: any, i: number) => {
                    // 为什么要用descriptors[route.key]？
                    // 因为route对象里没有options属性，而descriptors[route.key]里有options属性
                    // 除了options属性，还有其他有用的信息，比如navigation、render等等
                    // 解构出来options属性
                    const { options } = descriptors[route.key]
                    const label = options.title
                    const isFocused = index === i;
                    if (i  === 2) {
                        return (
                            <TouchableOpacity key={label} style={styles.tabItem} onPress={onPublishPress}>
                                <Image source={icon_tab_publish} style={{ width: 58, height: 40, resizeMode: 'contain' }}/>
                            </TouchableOpacity>
                        )
                    }
                    return(
                        <TouchableOpacity key={label} style={styles.tabItem} onPress={() => {navigation.navigate(route.name)}}>
                            <Text style={{ fontSize: isFocused ? 16 : 14, fontWeight: isFocused ? 'bold' : 'normal', color: isFocused ? '#333' : '#999' }}>{label}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
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
                <Tab.Screen name="Publish" component={Shop} options={{ title: '发布' }}/>
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
    },
    tabBarContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    tabItem: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});