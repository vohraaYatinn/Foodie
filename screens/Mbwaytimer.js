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
import { FetchPaymentStatus, PlaceOrderAfterPayment } from '../urls/urls'
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

const Mbwaytimer = ({ navigation, route }) => {
    const { verification } = route.params;

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
    const [orderAfterPaymentresponse, orderAfterPaymentError, orderAfterPaymentLoading, orderAfterPaymentFetch] = useAxios()


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
    useEffect(() => {
        if (orderAfterPaymentError?.response) {
            notify(orderAfterPaymentError?.response?.data, "error")
        }
      }, [orderAfterPaymentError])
    useEffect(()=>{
        if(responseLogin?.result == "success"){
            if(responseLogin?.response?.Message == "Success"){
                orderAfterPaymentFetch(PlaceOrderAfterPayment())

            }
            else if(responseLogin?.response?.Message == "Failed" || responseLogin?.response?.Message == "Expired"){
                navigation.navigate('PaymentFail')
            }
        //  navigation.navigate('Verification', { phone: responseLogin?.phone, verification :responseLogin?.verification_code });

            
        }
    },[responseLogin])
    useEffect(()=>{
        if(orderAfterPaymentresponse?.result == "success"){
         navigation.navigate('PaymentSuccess');
        }
    },[orderAfterPaymentresponse])


    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds

    const fetchPaymentStatusFunc = () => {
        if(timeLeft>0){
            responseFetch(FetchPaymentStatus({
                verificationId:verification
            }))
        }
        else{
            navigation.navigate('PaymentFail')
        }
    }


    useEffect(() => {
        if (timeLeft <= 0) {
            navigation.navigate('PaymentFail')

        };
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchPaymentStatusFunc();
        }, 7000); // 7 seconds

        return () => clearInterval(interval);
    }, []); // Empty dependency array to ensure it runs only once after component mount


    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.cover_purple }}>
        <StatusBar hidden />
        <View style={commonStyles.header}>
            <Text style={commonStyles.headerTitle}>{"MBway"}</Text>
            <Text style={commonStyles.subHeaderTitle}>
                {"You have 3 minutes to authenticate this transaction"}
            </Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={commonStyles.footer}>
            <Text style={commonStyles.timerText}>
                {`Time Remaining: ${formatTime(timeLeft)}`}
            </Text>
        </Animatable.View>
        <Toast />
    </View>
    )
}




export default Mbwaytimer;