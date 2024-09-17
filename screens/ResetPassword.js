import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { COLORS } from '../constants'
import * as Animatable from "react-native-animatable"
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const isTestMode = true

const initialState = {
    inputValues: {
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********': ''
    },
    inputValidities: {
        password: false,
        confirmPassword: false
    },
    formIsValid: false,
}

const ResetPassword = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

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
        <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <StatusBar style="light"/>
            <View style={commonStyles.header}>
                <TouchableOpacity 
                onPress={()=>navigation.goBack()}
                style={commonStyles.backIcon}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Reset Password</Text>
                <Text
                    style={commonStyles.subHeaderTitle}>Please reset your password to get started</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}>
                < KeyboardAwareScrollView>
                <Text style={commonStyles.inputHeader}>Password</Text>
                <Input
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['password']}
                    autoCapitalize="none"
                    id="password"
                    placeholder="*************"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={true}
                />

                <Text style={commonStyles.inputHeader}>Re-Type Password</Text>
                <Input
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['passwordConfirm']}
                    autoCapitalize="none"
                    id="passwordConfirm"
                    placeholder="*************"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={true}
                />
                <Button
                    title="RESET"
                    isLoading={isLoading}
                    filled
                    onPress={() => navigation.navigate('Login')}
                    style={commonStyles.btn1}
                />
                </KeyboardAwareScrollView>
            </Animatable.View>
        </View>
    )
}

export default ResetPassword