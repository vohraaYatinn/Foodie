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
import { sendUserOtp } from '../urls/urls'
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

const Signupwithphone = ({ navigation }) => {
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


    const checkToken = async() => {
        const getToken = await AsyncStorage.getItem('tokenJson')
        if(getToken){
            navigation.navigate("Main")}
    }
    useEffect(()=>{
        checkToken()
    },[])
    const addToken = async(token) => {
        await AsyncStorage.setItem('tokenJson', token)

    }
    const [selectedLanguage, setSelectedLanguage] = useState("");

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

         navigation.navigate('Verification', { phone: responseLogin?.phone, verification :responseLogin?.verification_code });

            
        }
    },[responseLogin])


    const fetchLoginFunc = () => {
        responseFetch(sendUserOtp(formState))
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.cover_purple }}>
        <StatusBar hidden />
        <View style={commonStyles.header}>
            <Text style={commonStyles.headerTitle}>{t('welcome')}</Text>
            <Text style={commonStyles.subHeaderTitle}>{t('sign_in_to_account')}</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={commonStyles.footer}>
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


            <View style={commonStyles.checkBoxContainer}>
               
                {/* <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                    <Text style={{ ...FONTS.body4, color: COLORS.primary }}>{t('forgot_password')}</Text>
                </TouchableOpacity> */}
            </View>

            <Button
                title={"Verify"}
                isLoading={responseLoading}
                filled
                onPress={() => fetchLoginFunc()}
                style={commonStyles.btn}
            />
            <View style={commonStyles.center}>
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>{"Already have an account"}{' '}</Text>
                <TouchableOpacity onPress={() => 
                    navigation.navigate("Login")
                    }>
                    <Text style={{ ...FONTS.body4, color: COLORS.primary }}>{"Sign In"}</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
        <Toast/>
    </View>
    )
}

export default Signupwithphone