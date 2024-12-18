import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../constants'
import * as Animatable from "react-native-animatable"
import Button from '../components/Button'
import { commonStyles } from '../styles/CommonStyles'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import SmoothOtpInput from "../common/Components/SmoothOtpInput"
import useAxios from '../network/useAxios'
import { VerifyCode } from '../urls/urls'
import Toast from 'react-native-toast-message';

const Forgotpasswordverification = ({ navigation, route }) => {
    const { phone, verification } = route.params;
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [responseLogin, responseError, responseLoading, responseFetch] = useAxios();
    const [otp, setOtp] = useState('');

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])
    const notify = (message, action) =>{
        Toast.show({
            type: action,
            text1: action,
            text2: message
        });
    }
    useEffect(()=>{
        if(responseLogin?.result == "success"){

         navigation.navigate('Passwordchange', { phone: phone });

        }
    },[responseLogin])
    useEffect(() => {
        if (responseError?.response) {
            notify(responseError?.response?.data, "error")
        }
      }, [responseError])

    const verifyCode = () => {
        responseFetch(VerifyCode({otp:otp, phone:phone, verificationCode:verification}))
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <StatusBar hidden={true} />
            <View style={commonStyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.backIcon}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Verification</Text>
                <Text style={commonStyles.subHeaderTitle}>We have sent a code to your phone</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}>
                <View style={styles.center}>
                    <Text style={commonStyles.inputHeader}>Please enter the code below</Text>
                  
                </View>
                <View style={{ width: "100vw", height: 88, paddingHorizontal: 8, display:"flex", alignItems:"center", marginTop:50}}>
      <SmoothOtpInput 
            value={otp}
            codeLength={4} // Length of OTP
            onTextChange={setOtp} // Update OTP state as the user types
            cellSize={50} // Size of each input cell
            cellSpacing={10} // Space between cells
            placeholder="-" // Placeholder in empty cells
            password={false} // Set to true for masking OTP
            mask="*" // Character used for masking if password is true
            autoFocus={true} // Automatically focus the input on load
            keyboardType="numeric" // Use numeric keyboard
            animated={true} // Enable animations
            onFulfill={(code) => {}} // Triggered when OTP is complete
      />
      </View>
                <Button
                    title="VERIFY"
                    isLoading={isLoading}
                    filled
                    onPress={() => 
                        verifyCode()
                    }
                    style={commonStyles.btn1}
                />
            </Animatable.View>
            <Toast/>

        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Forgotpasswordverification