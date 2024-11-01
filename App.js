import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import AppNavigation from './navigations/AppNavigation'

import { LogBox } from 'react-native'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

//Ignore all log notifications
LogBox.ignoreAllLogs();


const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
    <SafeAreaProvider>
      <AppNavigation/>
    </SafeAreaProvider>
    </I18nextProvider>
  )
}

export default App