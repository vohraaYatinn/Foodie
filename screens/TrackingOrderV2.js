import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons, SIZES, COLORS, FONTS } from '../constants'
import { orderList } from '../data/utils'
import RBSheet from "react-native-raw-bottom-sheet"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import VerticalStepper from '../components/VerticalStepper'
import Toast from 'react-native-toast-message'; // Import Toast
import { getOrderView } from '../urls/urls'
import useAxios from '../network/useAxios'
import { test_url_images } from '../config/environment'

const TrackingOrderV2 = ({ navigation, route }) => {
  const { id } = route.params;
  const notify = (message, action) => {
    Toast.show({
        type: action,
        text1: action,
        text2: message
    });
}
  const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()
  const fetchDashboarfFunc = () => {
    responseFetch(getOrderView({
      uuid : id
    }))
}
useEffect(()=>{
  fetchDashboarfFunc()
},[])
const [data, setData] = useState([])
useEffect(() => {
  if (responseError?.response) {
      notify(responseError?.response?.data, "error")
  }
}, [responseError])
useEffect(()=>{
  if(responseLogin?.result == "success"){
    setData(responseLogin?.data[0])
  }
},[responseLogin])
  const bottomSheetRef = useRef(null);

  // Open the bottom sheet on component mount
  useEffect(() => {
    bottomSheetRef.current.open();
  }, []);
  useEffect(()=>{

  },[id])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:COLORS.primary}}>
      <StatusBar hidden={true} />
    
      <RBSheet
        ref={bottomSheetRef}
        height={500}
        openDuration={250}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: COLORS.gray6,
            width: 100
          }
        }}
      >
        <View style={{
          width: SIZES.width - 32,
          marginHorizontal: 16,
        }}>
          <View
            style={{ flexDirection: 'row' }}
          >
            <View style={{
              marginRight: 12
            }}>
              <Image
                // source={images.food}
                src={data?.order_items?.[0]?.item?.image && test_url_images + data?.order_items?.[0]?.item?.image}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 12,
                  borderColor: COLORS.gray,
                  borderWidth: 1
                }}
              />
            </View>
            <View style={{
              flexDirection: 'column',
            }}>
              <Text style={{ ...FONTS.h4 }}>order #{data.uuid}</Text>
              <Text style={styles.body3}>{data.ordered_at}</Text>

              {data?.order_items?.map((item)=>{
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.h3}>{item?.quantity}x</Text>
                  <Text style={styles.body3}>{item?.item?.name}</Text>
                </View>
                )
              })}
            
            
            </View>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 22
          }}>
            {!(data?.status == "delivered" ||data?.status == "cancelled") &&
            <>
            <Text style={{ ...FONTS.h3 }}>20 min</Text>
            <Text style={{
              fontFamily: "Sen Regular",
              fontSize: 14,
              color: COLORS.gray5,
              textTransform: 'uppercase',
              marginTop: 8
            }}>Estimated delivery time</Text>
            </>
          }
          </View>
          

          <VerticalStepper content={data?.order_history}/>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 20
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            
              <View style={{ marginLeft: 12 }}>
                <TouchableOpacity
                 style={{
                  height: 45,
                  width: 45,
                  borderRadius: 22.5,
                  backgroundColor: COLORS.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                  zIndex: 9999}}
                onPress={()=>{
                  navigation.goBack()
                }}>
              <Image

source={icons.arrowLeft}
resizeMode="contain"
style={{
  height: 24,
  width: 24,
  tintColor: COLORS.white
}}
/>
</TouchableOpacity>
            
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
             
          
            </View>
          </View>
        </View>
      </RBSheet>
      <Toast/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    zIndex: 1
  },
  // Callout bubble
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 'auto',
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  body3: {
    fontSize: 12,
    color: COLORS.gray5,
    marginVertical: 3,
  },
  h3: {
    fontSize: 12,
    color: COLORS.gray5,
    marginVertical: 3,
    fontFamily: "Sen Bold",
    marginRight: 6
  },
  btn1: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn2: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderColor: COLORS.primary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default TrackingOrderV2