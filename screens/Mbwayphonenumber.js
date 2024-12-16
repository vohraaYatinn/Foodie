import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS, FONTS, icons } from '../constants'
import CheckBox from '@react-native-community/checkbox'
import * as Animatable from "react-native-animatable"
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import useAxios from '../network/useAxios'
import { InitiatePayment } from '../urls/urls'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';


const isTestMode = true

const initialState = {
    inputValues: {
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
    },
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false,
}

const Mbwayphonenumber = ({ navigation }) => {
    
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState("en")
    const switchLanguage = () => {
        if(lang == "en"){
            setLang("pt")
        }
        else{
            setLang("en")

        }
        i18n.changeLanguage(lang); // Change language dynamically
      };


    const getLang = async(token) => {
        const lang = AsyncStorage.getItem('language')
        if (lang == "en"){
          setSelectedLanguage("English")
          i18n.changeLanguage('en');
        }
        else if(lang == "pt"){
          setSelectedLanguage("Portuguese")
          i18n.changeLanguage('pt');
        }
    }
    useEffect(()=>{getLang(),[]})

    const addUser = async(user) => {
        await AsyncStorage.setItem('userName', user?.full_name)
        await AsyncStorage.setItem('phoneNumber', user?.phone_number)

    }
    const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()


    const [isChecked, setChecked] = useState(false);
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const notify = (message, action) =>{
        Toast.show({
            type: action,
            text1: action,
            text2: message
        });
    }
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
    useEffect(() => {
        if (responseError?.response) {
            notify(responseError?.response?.data, "error")
        }
      }, [responseError])
    useEffect(()=>{
        if(responseLogin?.result == "success"){
            console.log(responseLogin)
                    // navigation.navigate("Mbwaytimer")
            if(responseLogin?.response?.RequestId && responseLogin?.response?.Message == "Success"){
                navigation.navigate('Mbwaytimer', { verification :responseLogin?.response?.RequestId });

            }
            else{
                notify("There is some issue with your number", "error")

            }

            
        }
    },[responseLogin])


    const fetchLoginFunc = () => {
        responseFetch(InitiatePayment(formState))
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.cover_purple }}>
        <StatusBar hidden />
        
        {/* Header */}
        <View style={commonStyles.header}>
            <Text style={commonStyles.headerTitle}>{t('mbway.title')}</Text>
            <Text style={commonStyles.subHeaderTitle}>{t('mbway.subtitle')}</Text>
        </View>

        {/* Animated Footer */}
        <Animatable.View animation="fadeInUpBig" style={commonStyles.footer}>
            
            {/* Input Field */}
            <Text style={commonStyles.inputHeader}>{t('signup.phone')}</Text>
            <Input
                id="phone"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities['phone']}
                placeholder={t('signup.phone_placeholder')}
                placeholderTextColor={COLORS.black}
                maxLength={9}
                keyboardType="numeric"
            />

            {/* Button */}
            <Button
                title={t('mbway.pay_button')}
                isLoading={responseLoading}
                filled
                onPress={() => fetchLoginFunc()}
                style={commonStyles.btn}
            />
        </Animatable.View>
        
        <Toast />
    </View>
    )
}

export default Mbwayphonenumber;