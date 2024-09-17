import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import AppNavigation from './navigations/AppNavigation'

import { LogBox } from 'react-native'

//Ignore all log notifications
LogBox.ignoreAllLogs();


const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigation/>
    </SafeAreaProvider>
  )
}

export default App