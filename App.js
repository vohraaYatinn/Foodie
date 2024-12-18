import { SafeAreaProvider } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import AppNavigation from './navigations/AppNavigation'

import { LogBox } from 'react-native'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Ignore all log notifications
LogBox.ignoreAllLogs();
const requestUserPermission = async() => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
const getToken = async() =>{
  const token = await messaging().getToken()
  await AsyncStorage.setItem('token', token)

  console.log("Token=", token)
}



const App = () => {
  useEffect(()=>{
    requestUserPermission()
    getToken()
  },[])
  return (
    <I18nextProvider i18n={i18n}>
    <SafeAreaProvider>
      <AppNavigation/>
    </SafeAreaProvider>
    </I18nextProvider>
  )
}

export default App