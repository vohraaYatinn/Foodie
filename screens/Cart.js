import { View, Text, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import * as Animatable from "react-native-animatable"
import { cartStyles } from '../styles/CartStyles'
import { commonStyles } from "../styles/CommonStyles"
import Input from '../components/Input'
import Button from '../components/Button'
import { cartData } from '../data/utils'
import useAxios from '../network/useAxios'
import { CartAction, fetchCartCustomer } from '../urls/urls'
import Toast from 'react-native-toast-message'; // Import Toast
import { test_url_images } from '../config/environment'

const Cart = ({ navigation }) => {

  const notify = (message, action) =>{
    Toast.show({
        type: action,
        text1: action,
        text2: message
    });
}
  const [data, setData] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [address, setAddress] = useState([])
  const [cartResponse, cartError, cartLoading, cartFetch] = useAxios()
  const [cartActionResponse, cartActionError, cartActionLoading, cartActionFetch] = useAxios()
  const calculatePrice = (data) => {
    let price = 0;
  }
  const fetchCustomerCart = () => {
    cartFetch(fetchCartCustomer())
}
  const CustomerActionCart = (id, action) => {
    cartActionFetch(CartAction({
      id:id,
      action:action
    }))
}
useEffect(()=>{
  fetchCustomerCart()
},[])

useEffect(() => {
  if (cartError?.response) {
      notify(cartError?.response?.data, "error")
  }
}, [cartError])

useEffect(()=>{
  if(cartResponse?.result == "success"){
    setData(cartResponse?.data)
    setTotalAmount(cartResponse?.total_amount)
    setAddress(cartResponse?.address)
  }
},[cartResponse])
useEffect(() => {
  if (cartActionError?.response) {
      notify(cartActionError?.response?.data, "error")
  }
}, [cartActionError])

useEffect(()=>{
  if(cartActionResponse?.result == "success"){
    fetchCustomerCart()
  }
},[cartActionResponse])
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <StatusBar hidden={true} />
      <View style={cartStyles.header}>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular", color: COLORS.white }}>Cart</Text>
          </View>
          <TouchableOpacity
            onPress={() => console.log("Edit Items")}
          >
            <Text style={{ fontSize: 14, fontFamily: "Sen Bold", textTransform: 'uppercase', color: COLORS.green }}>Done</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {

            return (
              <View key={index} style={cartStyles.cartItemContainer}>
                <View style={{ marginRight: 2, width: 120 }}>
                  <Image
                    // source={images.food}
                    src={test_url_images + item?.item.image}
                    resizeMode='contain'
                    style={{
                      height: 120,
                      width: 120,
                      borderRadius: 30,
                    }}
                  />
                </View>
                <View style={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: "100%",
                  width: SIZES.width - 152,
                  paddingLeft: 10,
                  paddingRight: 6
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: COLORS.white,
                        fontFamily: "Sen Regular",
                        textTransform: 'capitalize',
                        marginRight: 20
                      }}>{item?.item.name}</Text>
                    <TouchableOpacity
                      onPress={() => CustomerActionCart(item?.id, "delete")}
                      style={{
                        height: 26,
                        width: 26,
                        borderRadius: 13,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.red,
                        marginTop: 2
                      }}
                    >
                      <Image
                        source={icons.close}
                        resizeMode="contain"
                        style={{
                          width: 12,
                          width: 12,
                          tintColor: COLORS.white
                        }}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={{
                    fontSize: 20,
                    fontFamily: "Sen Bold",
                    color: COLORS.white,
                    marginVertical: 6,
                    
                  }}>€ {item?.item?.price * item?.quantity}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                   
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity
                        onPress={()=>{
                          CustomerActionCart(item?.id, "decrement")
                        }}
                        style={cartStyles.roundedBtn}
                      >
                        <Text style={cartStyles.body2}>-</Text>
                      </TouchableOpacity>
                      <Text style={{
                        fontSize: 16,
                        fontFamily: "Sen Regular",
                        color: COLORS.white,
                        marginHorizontal: 12
                      }}>{item?.quantity}</Text>
                      <TouchableOpacity
                        onPress={()=>{
                          CustomerActionCart(item?.id, "increment")
                        }}                        style={cartStyles.roundedBtn}
                      >
                        <Text style={cartStyles.body2}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }
          }
        />

      </View>
      <Animatable.View animation="fadeInUpBig" style={cartStyles.footer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={cartStyles.body3}>Delivery Address</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Address")}
          >
            <Text style={cartStyles.body3Color}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Input
          id="Address"
          placeholder={address?.[0]?.street}
          placeholderTextColor={COLORS.gray4}
          editable={false}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={cartStyles.body3}>Total:</Text>
            <Text style={{ fontSize: 24, fontFamily: "bold", color: COLORS.black, marginLeft: 12 }}>€ {totalAmount}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginLeft: 2 }}>
              <Image
                source={icons.arrowRight}
                style={{
                  height: 18,
                  width: 18,
                  tintColor: COLORS.black
                }}
              />
            </View>
          </View>
        </View>

        <Button
          filled
          title="PLACE ORDER"
          onPress={() => navigation.navigate("PaymentMethod")}
          style={{ marginVertical: 2 }}
        />
      </Animatable.View>
      <Toast/>
    </SafeAreaView>
  )
}

export default Cart