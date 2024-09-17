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

const Login = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false);
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

    // implementing facebook authentication
    const facebookAuthHandler = () => {
        return null
    }

    // implementing twitter authentication
    const twitterAuthHandler = () => {
        return null
    }

    // implementing google authentication
    const googleAuthHandler = () => {
        return null
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.cover_purple }}>
            <StatusBar hidden />
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerTitle}>Log In</Text>
                <Text
                    style={commonStyles.subHeaderTitle}>Please sign in to your existing account</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}>
                <Text style={commonStyles.inputHeader}>Email</Text>
                <Input
                    id="email"
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities['email']}
                    placeholder="example@gmail.com"
                    placeholderTextColor={COLORS.black}
                    keyboardType="email-address"
                />
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

                <View style={commonStyles.checkBoxContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <CheckBox
                            style={commonStyles.checkbox}
                            value={isChecked}
                            tintColor={isChecked ? COLORS.primary : "gray"}
                            onValueChange={setChecked}
                            boxType="square"
                            onTintColor={COLORS.primary}
                            onFillColor={COLORS.primary}
                            onCheckColor={COLORS.white}
                          />
                        <Text style={{ ...FONTS.body4 }}>Remenber me</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ForgotPassword")}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>Forgot Password ?</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="LOG IN"
                    isLoading={isLoading}
                    filled
                    onPress={() => navigation.navigate('LocationAccess')}
                    style={commonStyles.btn}
                />
                <View style={commonStyles.center}>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>Don't have an account?{" "}</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ ...FONTS.body4, color: COLORS.black, textAlign: 'center' }}>Or</Text>

                <View style={commonStyles.socialContainer}>
                    <TouchableOpacity
                        onPress={facebookAuthHandler}
                        style={commonStyles.socialIconContainer}
                    >
                        <Image
                            source={icons.google}
                            resizeMode="contain"
                            style={commonStyles.socialLogo}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={twitterAuthHandler}
                        style={commonStyles.socialIconContainer}
                    >
                        <Image
                            source={icons.twitter}
                            resizeMode="contain"
                            style={commonStyles.socialLogo}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={googleAuthHandler}
                        style={commonStyles.socialIconContainer}
                    >
                        <Image
                            source={icons.apple}
                            resizeMode="contain"
                            style={commonStyles.socialLogo}
                        />
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default Login