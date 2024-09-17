import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../constants'
import * as Animatable from "react-native-animatable"
import Button from '../components/Button'
import { commonStyles } from '../styles/CommonStyles'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import OTPInputView from '@twotalltotems/react-native-otp-input';

const Verification = ({ navigation }) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

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
                <Text style={commonStyles.subHeaderTitle}>We have sent a code to your email</Text>
                <Text style={commonStyles.subHeaderTitleBold}>example@gmail.com</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}>
                <View style={styles.center}>
                    <Text style={commonStyles.inputHeader}>Code</Text>
                    <TouchableOpacity
                        onPress={() => console.log("Resend")}
                    >
                        <Text style={{ textDecorationLine: 'underline' }}>Resend</Text>
                    </TouchableOpacity>
                </View>
              
                 <OTPInputView
                  style={{ width: "100%", height: 88, paddingHorizontal: 8}}
                  pinCount={4}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={{
                    backgroundColor: COLORS.gray,
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                    borderRadius: 10,
                    height: 58,
                    width: 58,
                    color: COLORS.black
                  }}
                  editable={true}
                  codeInputHighlightStyle={{
                    borderColor: COLORS.blue
                  }}
                  onCodeFilled={
                    (code)=>{
                      console.log(`Code is ${code}`)
                    }
                  }
                  />
                <Button
                    title="VERIFY"
                    isLoading={isLoading}
                    filled
                    onPress={() => navigation.navigate('ResetPassword')}
                    style={commonStyles.btn1}
                />
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default Verification