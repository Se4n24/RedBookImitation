import React, { use, useState }from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, TextInput, LayoutAnimation, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { formatPhone, replaceBlank } from '../../utils/StringUtil';
import { request } from '../../utils/request';
import UserStore from '../../stores/UserStore';

import icon_logo_main from '../../assets/icon_main_logo.png';
import icon_unselected from '../../assets/icon_unselected.png';
import icon_selected from '../../assets/icon_selected.png';
import icon_arrow from '../../assets/icon_arrow.png';
import icon_wx_small from '../../assets/icon_wx_small.png';
import icon_triangle from '../../assets/icon_triangle.png';
import icon_eye_close from '../../assets/icon_eye_close.png';
import icon_eye_open from '../../assets/icon_eye_open.png';
import icon_exchange from '../../assets/icon_exchange.png';
import icon_wx from '../../assets/icon_wx.png';
import icon_qq from '../../assets/icon_qq.webp';
import icon_close_modal from '../../assets/icon_close_modal.png';

export default () => {

    const navigation = useNavigation<StackNavigationProp<any>>();
    const [loginType, setLoginType] = useState<'quick' | 'input'>('quick');
    const [selected, setSelected] = useState<boolean>(false);
    const [pwdVisible, setPwdVisible] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [canLogin, setCanLogin] = useState<boolean>(false);

    const onLoginPress = async () => {
        if(!canLogin || !selected) {
            return;
        }
        
        const purePhone = replaceBlank(phone);

        // 用了store的登录方法
        UserStore.requestLogin(purePhone, pwd, (success: boolean) => {
            if(success) {
                navigation.replace('MainTab')
            }else {
                ToastAndroid.show('登录失败，请检查账号密码', ToastAndroid.SHORT);
            }
        })

        // navigation.replace('MainTab')
    }

    const renderQuickLogin = () => {
        const quickLoginStyles = StyleSheet.create({
            root: {
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                flexDirection: 'column-reverse',
                alignItems: 'center',
                paddingHorizontal: 55,
            },
            
            otherLoginButton: {
                flexDirection: 'row',
                padding: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 100 ,
            },
            ontherLoginTxt: {
                fontSize: 14,
                color: '#333333',
            },
            icon_arrow: {
                width: 16,
                height: 16,
                resizeMode: 'contain',
                marginLeft: 4,
                transform: [{ rotate: '180deg'}]
            },
            wxLoginButton: {
                width: '100%',
                height: 50,
                borderRadius: 30,
                backgroundColor: '#09bb07',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
            },
            icon_wx_small: {
                width: 32,
                height: 32,
                resizeMode: 'contain',
            },
            wxLoginTxt: {
                fontSize: 16,
                color: 'white',
            },
            one_key_LoginButton: {
                width: '100%',
                height: 50,
                borderRadius: 30,
                backgroundColor: '#ff1010ff',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
            },
            one_key_LoginTxt: {
                fontSize: 16,
                color: 'white',
            },
            icon_logo_main: {
                position: 'absolute',
                top: 170,
                height: 95,
                width: 180, 
                resizeMode: 'contain',
            }
        })
        return(
            <View style={quickLoginStyles.root}>
                <View style={allStyles.protocolLayout}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {setSelected(!selected)}}>
                        <Image style={allStyles.radioButton} source={selected ? icon_selected : icon_unselected}/>
                    </TouchableOpacity>

                    <Text style={allStyles.lableTxt}>我已阅读并同意</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {Linking.openURL('https://www.baidu.com')}}>
                        <Text style={allStyles.protolcolTxt}>《用户协议》和《隐私政策》</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={quickLoginStyles.otherLoginButton} onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setLoginType((type: 'quick' | 'input') => {
                        return type === 'quick' ? 'input' : 'quick'
                    })
                }}>
                    <Text style={quickLoginStyles.ontherLoginTxt}>其他登陆方式</Text>
                    <Image style={quickLoginStyles.icon_arrow} source={icon_arrow}/>
                </TouchableOpacity>

                <TouchableOpacity style={quickLoginStyles.wxLoginButton} activeOpacity={0.7}>
                    <Image style={quickLoginStyles.icon_wx_small} source={icon_wx_small} />
                    <Text style={quickLoginStyles.wxLoginTxt}>微信登录</Text>
                </TouchableOpacity>

                <TouchableOpacity style={quickLoginStyles.one_key_LoginButton} activeOpacity={0.7}>
                    <Text style={quickLoginStyles.one_key_LoginTxt}>一键登录</Text>
                </TouchableOpacity>

                <Image style={quickLoginStyles.icon_logo_main} source={icon_logo_main}/>
            </View>
        )
    }

    const renderInputLogin = () => {
        const inputLoginStyles = StyleSheet.create({
            root: {
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                paddingHorizontal: 48,
            },
            pwdLogin: {
                fontSize: 24,
                color: '#333333',
                fontWeight: 'bold',
                marginTop: 56
            },
            tips: {
                fontSize: 14,
                color: '#999999',
                marginTop: 8,
            },
            phoneLayout: {
                width: '100%',
                height: 64,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#bbb',
            },
            pre86: {
                fontSize: 24,
                color: '#999',
            },
            triangle: {
                width: 12,
                height: 6,
            },
            phoneInput: {
                flex: 1,
                height: 64,
                backgroundColor: 'transparent',
                fontSize: 24,
                color: '#bbb',
                marginLeft: 8,
            },
            pwdLayout: {
                width: '100%',
                height: 64,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                borderBottomWidth: 1,
                borderBottomColor: '#bbb',
            },
            pwdInput: {
                marginLeft: 0,
                marginRight: 12,
            },
            eyeIcon: {
                width: 24,
                height: 24,
            },
            changeLayout: {
                width: '100%',
                marginTop: 16,
                alignItems: 'center',
                flexDirection: 'row',
            },
            changeIcon: {
                width: 16,
                height: 16,
            },
            changeTxt: {
                fontSize: 14,
                color: '#000000ff',
                flex: 1,
                marginLeft: 4,
            },
            forgetPwdTxt: {
                fontSize: 14,
                color: '#000000ff',
            },
            loginButton: {
                width: '100%',
                height: 52,
                borderRadius: 26,
                backgroundColor: canLogin ? '#ff1010ff' : '#cccccc',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 15,
            },
            loginTxt: {
                fontSize: 20 ,
                color: 'white',
            },
            wxqqLayout: {
                width: '100%',
                flexDirection: 'row',
                marginTop: 60,
                justifyContent: 'center',
            },
            wxIcon: {
                width: 48,
                height: 48,
                marginRight: 100,
            },
            qqIcon: {
                width: 48,
                height: 48,
            },
            closeButton: {
                position: 'absolute',
                top: 24,
                left: 36,
            },
            closeImg: {
                width: 24,
                height: 24,
            },
        })

        return(
            <View style={inputLoginStyles.root}>
                <Text style={inputLoginStyles.pwdLogin}>账号密码登录</Text>
                <Text style={inputLoginStyles.tips}>未注册的手机号登陆成功后将自动注册</Text>

                <View style={inputLoginStyles.phoneLayout}>
                    <Text style={inputLoginStyles.pre86}>+86 </Text>
                    <Image style={inputLoginStyles.triangle} source={icon_triangle}/>
                    <TextInput placeholder='请输入手机号码' placeholderTextColor="#bbb" style={inputLoginStyles.phoneInput} autoFocus={false}
                        keyboardType='number-pad' maxLength={13} value={phone} onChangeText={(text: string) => {
                            setPhone(formatPhone(text));
                            replaceBlank(phone).length === 11 && pwd.length >= 6 ? setCanLogin(true) : setCanLogin(false);
                        }}
                    />
                </View>

                <View style={inputLoginStyles.pwdLayout}>
                    <TextInput placeholder='请输入密码' placeholderTextColor="#bbb" style={[inputLoginStyles.phoneInput, inputLoginStyles.pwdInput]} autoFocus={false}
                        secureTextEntry={!pwdVisible} value={pwd} onChangeText={(pwd1: string) => {
                            setPwd(pwd1);
                            replaceBlank(phone).length === 11 && pwd.length >= 5 ? setCanLogin(true) : setCanLogin(false);
                        }}
                    />
                    <TouchableOpacity onPress={() => {setPwdVisible((visible: boolean) => !visible)}}>
                        <Image style={inputLoginStyles.eyeIcon} source={pwdVisible ? icon_eye_open : icon_eye_close}/>
                    </TouchableOpacity>
                </View>

                <View style={inputLoginStyles.changeLayout}>
                    <Image style={inputLoginStyles.changeIcon} source={icon_exchange}/>
                    <Text style={inputLoginStyles.changeTxt}>验证码登录</Text>
                    <Text style={inputLoginStyles.forgetPwdTxt}>忘记密码？</Text>
                </View>

                <TouchableOpacity 
                    // disabled={!canLogin}
                    style={inputLoginStyles.loginButton} onPress={() => {
                    onLoginPress()
                }}>
                    <Text style={inputLoginStyles.loginTxt}>登录</Text>
                </TouchableOpacity>

                <View style={allStyles.protocolLayout}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {setSelected(!selected)}}>
                        <Image style={allStyles.radioButton} source={selected ? icon_selected : icon_unselected}/>
                    </TouchableOpacity>

                    <Text style={allStyles.lableTxt}>我已阅读并同意</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {Linking.openURL('https://www.baidu.com')}}>
                        <Text style={allStyles.protolcolTxt}>《用户协议》和《隐私政策》</Text>
                    </TouchableOpacity>
                </View>

                <View style={inputLoginStyles.wxqqLayout}>
                    <Image style={inputLoginStyles.wxIcon} source={icon_wx}/>
                    <Image style={inputLoginStyles.qqIcon} source={icon_qq}/>
                </View>

                <TouchableOpacity style={inputLoginStyles.closeButton} onPress={() => {setLoginType('quick')}}>
                    <Image style={inputLoginStyles.closeImg} source={icon_close_modal}/>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={allStyles.root}>
            {
                loginType === 'quick' ? renderQuickLogin() : renderInputLogin()
            }
        </View>
    )
}

 const allStyles = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo_main: {
        marginTop: 100,
        height: 100,
        width: 200, 
    },
    protocolLayout: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 40,
        alignItems: 'center',
    },
    radioButton: {
        width: 20,
        height: 20,
    },
    lableTxt: {
        fontSize: 12,
        color: '#999999',
        marginLeft: 8,
    },
    protolcolTxt: {
        fontSize: 12,
        color: '#1020ff',
    },
});