import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { Onboarding1, 
    Onboarding2, 
    Onboarding3, 
    Signup, 
    Signupwithphone,
    Verification,
    Login, 
    StartUpScreen, 
    ForgotPassword, 
    ResetPassword, 
    Onboarding4 ,
    LocationAccess,
    HomeV1,
    FoodDetailsV1,
    FoodDetailsV2,
    RestaurantView1,
    RestaurantView2,
    FoodByKeywords,
    Cart,
    EditCart,
    PaymentMethod,
    PaymentMethodNoCard,
    AddPaymentCard,
    PaymentSuccess,
    TrackingOrderV1,
    Message,
    Menu,
    PersonalProfile,
    EditProfile,
    Address,
    AddNewAddress,
    Call,
    TrackingOrderV2,
    OpenShops,
    CancelOrders,
    AddReviews,
    VideoCall,
    Chat,
    UserReviews,
    Faqs,
    Settings,
    SubmitQuestion,
    Mbwayphonenumber,
    Mbwaytimer,
    PaymentFail,
    Forgotpasswordphone,
    Forgotpasswordverification,
    Passwordchange
} from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './BottomTabNavigation'
import DrawerNavigation from './DrawerNavigation'
import LangSelection from '../screens/LangSelection'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkIfFirstLaunch = async () => {
            try {
                const value = await AsyncStorage.getItem('alreadyLaunched')
                if (value === null) {
                    await AsyncStorage.setItem('alreadyLaunched', 'true')
                    setIsFirstLaunch(true)
                } else {
                    setIsFirstLaunch(false)
                }
            } catch (error) {
                setIsFirstLaunch(false)
            }
            setIsLoading(false) // Set loading state to false once the check is complete
        }

        checkIfFirstLaunch()
    }, [])

    if (isLoading) {
        return null // Render a loader or any other loading state component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                 screenOptions={{ headerShown: false}}
                initialRouteName={
                  isFirstLaunch ? 'LangSelection' : "Login"
                }
            >
                              <Stack.Screen
                  name="LangSelection"
                  component={LangSelection}
                />
                              <Stack.Screen
                  name="DrawerNavigation"
                  component={DrawerNavigation}
                />
                <Stack.Screen
                    name="Onboarding1"
                    component={Onboarding1}
                />
                <Stack.Screen
                    name="Signupwithphone"
                    component={Signupwithphone}
                />
                <Stack.Screen
                    name="Forgotpasswordphone"
                    component={Forgotpasswordphone}
                />
                <Stack.Screen
                    name="Onboarding2"
                    component={Onboarding2}
                />
                <Stack.Screen
                    name="Onboarding3"
                    component={Onboarding3}
                />
                <Stack.Screen
                  name="Onboarding4"
                  component={Onboarding4}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                />
                <Stack.Screen
                    name="StartUpScreen"
                    component={StartUpScreen}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                />

                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                />
                <Stack.Screen
                  name="Verification"
                  component={Verification}
                />
                <Stack.Screen
                  name="LocationAccess"
                  component={LocationAccess}
                />
                <Stack.Screen
                  name="HomeV1"
                  component={HomeV1}
                />
                <Stack.Screen
                  name="Main"
                  component={BottomTabNavigation}
                />

                <Stack.Screen
                  name="FoodByKeywords"
                  component={FoodByKeywords}
                />
                <Stack.Screen
                  name="FoodDetails"
                  component={FoodDetailsV1}
                />
                <Stack.Screen
                  name="RestaurantView"
                  component={RestaurantView1}
                />

                <Stack.Screen
                  name="Cart"
                  component={Cart}
                />
                <Stack.Screen
                  name="EditCart"
                  component={EditCart}
                />
                <Stack.Screen
                  name="PaymentMethod"
                  component={PaymentMethod}
                />
                <Stack.Screen
                  name="PaymentMethodNoCard"
                  component={PaymentMethodNoCard}
                />
                <Stack.Screen
                  name="AddPaymentCard"
                  component={AddPaymentCard}
                />
                <Stack.Screen
                  name="PaymentSuccess"
                  component={PaymentSuccess}
                />
                <Stack.Screen
                  name="PaymentFail"
                  component={PaymentFail}
                />
                <Stack.Screen
                  name="TrackingOrders"
                  component={TrackingOrderV2}
                />
                <Stack.Screen
                 name="Call"
                 component={Call}
                />
                <Stack.Screen
                  name="Message"
                  component={Message}
                />
                <Stack.Screen
                  name="Menu"
                  component={Menu}
                />
                <Stack.Screen
                  name="PersonalProfile"
                  component={PersonalProfile}
                />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfile}
                />
                <Stack.Screen
                  name="Address"
                  component={Address}
                />
                <Stack.Screen
                  name="AddNewAddress"
                  component={AddNewAddress}
                />
                <Stack.Screen
                  name="OpenShops"
                  component={OpenShops}
                />
                <Stack.Screen
                  name="CancelOrders"
                  component={CancelOrders}
                />
                <Stack.Screen
                  name="AddReviews"
                  component={AddReviews}
                />
                <Stack.Screen
                  name="VideoCall"
                  component={VideoCall}
                />
                <Stack.Screen
                  name="Chat"
                  component={Chat}
                />
                <Stack.Screen
                  name="UserReviews"
                  component={UserReviews}
                />
                <Stack.Screen
                  name="Passwordchange"
                  component={Passwordchange}
                />
                <Stack.Screen
                  name="Forgotpasswordverification"
                  component={Forgotpasswordverification}
                />
                <Stack.Screen
                  name="Faqs"
                  component={Faqs}
                />
                <Stack.Screen
                  name="Settings"
                  component={Settings}
                />
                <Stack.Screen
                  name="SubmitQuestion"
                  component={SubmitQuestion}
                />
                <Stack.Screen
                  name="Mbwayphonenumber"
                  component={Mbwayphonenumber}
                />
                <Stack.Screen
                  name="Mbwaytimer"
                  component={Mbwaytimer}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation