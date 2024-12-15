import { View, Text, TouchableOpacity, Image, useWindowDimensions, FlatList, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { COLORS,  icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { getCustomerNotification } from '../urls/urls'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-toast-message'; // Import Toast
import useAxios from '../network/useAxios'



const Notifications = ({ navigation }) => {
  const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()
  const fetchDashboarfFunc = () => {
    responseFetch(getCustomerNotification({
      status:"ongoing"
    }))
}

const notify = (message, action) => {
  Toast.show({
      type: action,
      text1: action,
      text2: message
  });
}
useFocusEffect(
  useCallback(() => {
    // Code here runs every time the screen comes into focus
    fetchDashboarfFunc()

    // Cleanup (optional) runs when the screen loses focus
    return () => {
     
    };
  }, [])
);
useEffect(() => {
  if (responseError?.response) {
      notify(responseError?.response?.data, "error")
  }
}, [responseError])
useEffect(()=>{
  if(responseLogin?.result == "success"){
    setNotification(responseLogin?.data)
  }
},[responseLogin])


  const [notifications, setNotification] = useState([])

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'first', title: 'Notifications' },  ])

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: COLORS.primary
      }}
      style={{
        backgroundColor: '#fff',
      }}
      renderLabel={({ route, focused, color }) => (
        <Text style={[{ color: focused ? COLORS.black : 'gray' }]}>
          {route.title}
        </Text>
      )}
    />
  );
 
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true} />
      <View style={{ flex: 1, marginHorizontal: 16 }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={commonStyles.header1Icon}
        >
          <Image
            resizeMode='contain'
            source={icons.arrowLeft}
            style={{ height: 24, width: 24, tintColor: COLORS.black }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular" }}>Notifications</Text>
      </View>
        <View style={{
          flex: 1,
        }}>
         <View style={{ flex: 1 }}>
    <FlatList
     style={{
      marginTop:20
    }}
      data={notifications}
      keyExtractor={item => item.id}
      renderItem={({ item, index }) => (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 12
          }}
        >
          <View style={{
            flexDirection: 'row'
          }}>
           
            <View style={{
              flexDirection: 'column',
              width: 150,
              marginLeft:10
            }}>
              <View style={{ flexDirection: 'row', width: 150, flexWrap: 'wrap' }}>
                <Text style={{
                  fontSize: 13,
                  fontFamily: "Sen Bold",
                  color: COLORS.black,
                }}>{item.name}</Text>
                <Text style={{
                  fontSize: 13,
                  fontFamily: "Sen Regular",
                  color: COLORS.black,
                  marginLeft: 2,
                  flexWrap: 'wrap'
                }}>{item.message}</Text>
              </View>
              <Text style={{
                fontSize: 10,
                fontFamily: "Sen Regular",
                color: COLORS.black,
                marginVertical: 16
              }}>{item.stamp_at}</Text>
            </View>
          </View>
<Text>
         #{item?.order?.uuid}
          </Text>
        </View>
      )}
    />
  </View>
        </View>
      </View>
      <Toast style={{zIndex:999}}/>
    </SafeAreaProvider>
  )
}

export default Notifications