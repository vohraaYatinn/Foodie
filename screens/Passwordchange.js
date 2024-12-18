import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import * as Animatable from "react-native-animatable"
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import useAxios from '../network/useAxios'
import { ChangePasswordCustomer } from '../urls/urls'
import Toast from 'react-native-toast-message'; // Import Toast
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next';

const isTestMode = true

const initialState = {
    inputValues: {
        fullName: isTestMode ? 'John Doe' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********' : ''
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false
    },
    formIsValid: false,
}

const Passwordchange = ({ navigation, route }) => {
    const { phone } = route.params;

    const { t } = useTranslation();

    const checkToken = async() => {
        const getToken = await AsyncStorage.getItem('tokenJson')
        if(getToken){
            navigation.navigate("Main")}
    }
    const addToken = async(token) => {
        await AsyncStorage.setItem('tokenJson', token)

    }
    useEffect(()=>{
        checkToken()
    },[])
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const notify = (message, action) =>{
        Toast.show({
            type: action,
            text1: action,
            text2: message
        });
    }
    const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()
    const ChangePasswordFunc = async() => {
        responseFetch(ChangePasswordCustomer({...formState, phone:phone}))
    }
    useEffect(() => {
        if (responseError?.response) {
            notify(responseError?.response?.data, "error")
        }
      }, [responseError])
    useEffect(()=>{
        if(responseLogin?.result == "success"){
            notify(responseLogin?.message, "success")
            setTimeout(() => {
                navigation.navigate("Login")
            }, 1000);
        }
    },[responseLogin])
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    return (
<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.cover_purple }}>
    <StatusBar hidden={true} />
    <View style={commonStyles.header}>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={commonStyles.backIcon}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>{"Change Password"}</Text>
        <Text style={commonStyles.subHeaderTitle}>{"Enter your new password"}</Text>
    </View>
    <Animatable.View animation="fadeInUpBig" style={commonStyles.footer}>
        <KeyboardAwareScrollView>
            <Text style={commonStyles.inputHeader}>{t('signup.password')}</Text>
            <Input
                id="password"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['password']}
                autoCapitalize="none"
                placeholder={t('signup.password_placeholder')}
                placeholderTextColor={COLORS.black}
                secureTextEntry={true}
            />
            <Text style={commonStyles.inputHeader}>{t('signup.password_confirm')}</Text>
            <Input
                id="passwordConfirm"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['passwordConfirm']}
                autoCapitalize="none"
                placeholder={t('signup.password_confirm_placeholder')}
                placeholderTextColor={COLORS.black}
                secureTextEntry={true}
            />
            <Button
                title={"Change Password"}
                isLoading={responseLoading}
                filled
                onPress={() => ChangePasswordFunc() }
                style={commonStyles.btn1}
            />
        </KeyboardAwareScrollView>
    </Animatable.View>
    <Toast />
</SafeAreaView>
    )
}

export default Passwordchange