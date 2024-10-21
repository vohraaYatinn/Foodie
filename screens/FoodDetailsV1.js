import { View, Image, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons, images } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import Octicons from "react-native-vector-icons/Octicons"
import { ScrollView } from 'react-native-virtualized-view'
import Button from "../components/Button"
import useAxios from '../network/useAxios'
import { fetchSingleMenuItem, addToCartCustomer } from '../urls/urls'
import Toast from 'react-native-toast-message'; // Import Toast
import { test_url_images } from '../config/environment'

const ingridents = [icons.salt, icons.chickenLeg, icons.onion, icons.chili]
const FoodDetailsV1 = ({ navigation, route }) => {
  const [quantity, setQuantity] = useState(1);

  const notify = (message, action) =>{
    Toast.show({
        type: action,
        text1: action,
        text2: message
    });
}
  const { itemId } = route.params;
  const [data, setData] = useState({
  })
  const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()
  const [cartResponse, cartError, cartLoading, cartFetch] = useAxios()
  const fetchDashboarfFunc = () => {
    responseFetch(fetchSingleMenuItem({
      menuId:itemId
    }))
}
const addToCart = () => {
  cartFetch(addToCartCustomer({
    menuId:itemId,
    quantity:quantity
  }))
} 
useEffect(()=>{
  fetchDashboarfFunc()
},[itemId])

useEffect(() => {
  if (responseError?.response) {
      notify(responseError?.response?.data, "error")
  }
}, [responseError])

useEffect(()=>{
  if(responseLogin?.result == "success"){
    setData(responseLogin?.data)
  }
},[responseLogin])
useEffect(() => {
  if (cartError?.response) {
      notify(cartError?.message, "error")
  }
}, [cartError])
useEffect(() => {
  if (cartResponse?.result == "success") {

    notify(cartResponse?.message, "success")
  }
}, [cartResponse])

  const renderHeader = () => {
    const navigation = useNavigation()
    return (
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
        <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular" }}>Details</Text>
      </View>
    )
  }

  const renderFoodDetails = () => {
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();

    const [selectedSize, setSelectedSize] = useState(null);
    const handleSizeSelection = (size) => {
      setSelectedSize(size);
    }
    return (
      <View style={{ marginVertical: 16 }}>
        {/* Food details images */}
        <View>
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
            style={{
              position: 'absolute',
              bottom: 18,
              right: 18,
              zIndex: 999,
              height: 37,
              width: 37,
              borderRadius: 18.5,
              backgroundColor: 'rgba(255,255,255,0.6)',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Ionicons
              name={isFavourite ? "heart-sharp" : "heart-outline"}
              size={24}
              color={isFavourite ? COLORS.primary : COLORS.white} />
          </TouchableOpacity>
          <Image
            // source={images.food}
            src={test_url_images + data?.image}
            resizeMode='contain'
            style={{
              width: SIZES.width - 32,
              height: 184,
              borderRadius: 32,
              borderColor: COLORS.gray6,
              borderWidth: 1
            }}
          />
        </View>
        {/* Food details infos */}
        <View style={{ marginVertical: 16 }}>
          <View style={{
            flexDirection: 'row',
            height: 47,
            width: 220,
            borderRadius: 50,
            paddingHorizontal: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLORS.gray6,
          }}>
            <Image
              source={images.restaurantLogo}
              resizeMode='contain'
              style={{
                width: 22,
                height: 22
              }}
            />
            <Text
              style={{
                marginLeft: 12,
                fontFamily: "Sen Regular",
                fontSize: 14
              }}
            >{data?.category?.name}</Text>
          </View>
          <Text style={{
            fontSize: 18,
            fontFamily: "Sen Bold",
            textTransform: 'capitalize',
            marginVertical: 10
          }}>{data?.name}</Text>
          <Text style={{
            fontSize: 13,
            fontFamily: "Sen Regular",
            color: COLORS.gray5
          }}>
            {data?.description}</Text>
{/* 
          <View style={{ flexDirection: "row", marginTop: 16 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Octicons name="star" size={24} color={COLORS.primary} />
              <Text style={{ marginLeft: 8 }}>4.7</Text>
            </View>
           
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft:20 }}>
              <Fontisto name="stopwatch" size={22} color={COLORS.primary} />
              <Text style={{ marginLeft: 8 }}>20 min</Text>
            </View>
          </View> */}

     

          <View style={{
            backgroundColor: COLORS.tertiaryGray,
            borderRadius: 24,
            paddingHorizontal: 10,
            paddingVertical: 16,
            marginTop:120

          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
            }}>
              <Text style={{ fontSize: 28, fontFamily: "Sen Regular" }}>€ {data?.price}</Text>
              <View style={{
                backgroundColor: COLORS.blue,
                width: 125,
                height: 48,
                borderRadius: 24,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 12,
                justifyContent: 'space-between'
              }}>
                <TouchableOpacity
                  onPress={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1)
                    }
                  }}
                  style={{
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }}
                >
                  <Text style={{ color: COLORS.white }}>-</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 16, color: COLORS.white }}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => setQuantity(quantity + 1)}
                  style={{
                    width: 24,
                    height: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 12,
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }}
                >
                  <Text style={{ color: COLORS.white }}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              filled
              onPress={() => addToCart()}
              title="ADD TO CART"
            />
            <Button
              style={{marginTop:10}}
              onPress={() => navigation.navigate("Cart")}
              title="VIEW CART"
            />
          </View>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar hidden={true}/>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderFoodDetails()}
        </ScrollView>
      </View>
      <Toast />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: "center",
    justifyContent: 'center',
    height: 48,
    width: 48,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12
  },
  selectedCheckbox: {
    backgroundColor: COLORS.primary
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "Sen Regular"
  },
})

export default FoodDetailsV1