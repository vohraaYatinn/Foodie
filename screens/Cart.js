import { View, Text, TouchableOpacity, Image, FlatList, StatusBar , StyleSheet} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import * as Animatable from "react-native-animatable"
import { cartStyles } from '../styles/CartStyles'
import { commonStyles } from "../styles/CommonStyles"
import Input from '../components/Input'
import Button from '../components/Button'
import { cartData } from '../data/utils'
import useAxios from '../network/useAxios'
import { addToCartCustomer, CartAction, fetchCartCustomer, getAllSideItems } from '../urls/urls'
import Toast from 'react-native-toast-message'; // Import Toast
import { test_url_images } from '../config/environment'
import { useFocusEffect } from '@react-navigation/native'
import { useTranslation } from 'react-i18next';
import AddOnProductSlider from '../common/Components/SliderComponent'

const Cart = ({ navigation }) => {
  const { t } = useTranslation();
  const [addonData, setAddonData] = useState([])

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
  const [AddcartResponse, AddcartError, AddcartLoading, AddcartFetch] = useAxios()

  const [cartResponse, cartError, cartLoading, cartFetch] = useAxios()
  const [getAllSideItemsResponse, getAllSideItemsError, getAllSideItemsLoading, getAllSideItemsFetch] = useAxios()
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
const getAllSideitems = () => {
  getAllSideItemsFetch(getAllSideItems())
  
}

const addToCart = (itemId) => {
  AddcartFetch(addToCartCustomer({
    menuId:itemId,
    quantity:1
  }))
} 
useFocusEffect(
  useCallback(() => {
    // Code here runs every time the screen comes into focus
    fetchCustomerCart()
    getAllSideitems()
    // Cleanup (optional) runs when the screen loses focus
    return () => {
     
    };
  }, [])
);



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

useEffect(()=>{
  if(getAllSideItemsResponse?.result == "success"){
    setAddonData(getAllSideItemsResponse?.data)
  }
},[getAllSideItemsResponse])
useEffect(() => {
  if (cartActionError?.response) {
      notify(cartActionError?.response?.data, "error")
  }
}, [cartActionError])

useEffect(()=>{
  if(cartActionResponse?.result == "success" || AddcartResponse?.result == "success"){
    fetchCustomerCart()
  }
},[cartActionResponse, AddcartResponse])
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const addOnProducts = [
    { id: 1, name: 'Product 1', price: 10, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Product 2', price: 20, image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Product 3', price: 15, image: 'https://via.placeholder.com/100' },
  ];


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
                  {!item?.item.is_available &&  <Text
                      style={{
                        fontSize: 13,
                        color: COLORS.white,
                        fontFamily: "Sen Regular",
                        textTransform: 'capitalize',
                        marginRight: 20,
                        color:"red"
                      }}>(Out of Stock)</Text> 
                      }
       

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
                  {
     item?.item?.is_buy_one &&   item?.quantity>1  &&
     
<View style={{ width: "100%", alignItems: "center" }}>
  <View style={styles.badge}>
    <Text style={styles.badgeText}>BUY 1 GET 1 FREE</Text>
  </View>
</View>
     


     }
                  <Text style={{
                    fontSize: 20,
                    fontFamily: "Sen Bold",
                    color: COLORS.white,
                    marginVertical: 6,
                    
                  }}>€{(item?.item?.is_buy_one &&  item?.quantity>1 ) ? item?.item?.price * (item?.quantity - 1) : item?.item?.price * item?.quantity} </Text>
                  
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
      <AddOnProductSlider products={addonData} addToCart={addToCart}/>

      <Animatable.View animation="fadeInUpBig" style={cartStyles.footer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={cartStyles.body3}>{t("cart_page.delivery_address")}</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Address")}>
                    <Text style={cartStyles.body3Color}>{t("cart_page.edit")}</Text>
                </TouchableOpacity>
            </View>
            <Input
                id="Address"
                placeholder={address?.[0]?.street}
                placeholderTextColor={COLORS.gray4}
                editable={false}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={cartStyles.body3}>{t("cart_page.total")}</Text>
                    <Text style={{
                        fontSize: 24,
                        fontFamily: "bold",
                        color: COLORS.black,
                        marginLeft: 12
                    }}>
                        € {totalAmount}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            {totalAmount < 15 && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ color: "purple" }}>
                        {t("cart_page.add_item_message", { amount: 15 })}
                    </Text>
                </View>
            )}
            <Button
                filled
                disabled={totalAmount === 0 || totalAmount < 15}
                isLoading={cartActionLoading}
                title={t("cart_page.place_order")}
                onPress={() => {
                    if (address && address?.[0]?.street) {
                        navigation.navigate("PaymentMethod");
                    } else {
                        notify(t("cart_page.address_error"), "error");
                    }
                }}
                style={{ marginVertical: 2 }}
            />
        </Animatable.View>
      <Toast/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({

  badge: {
    backgroundColor: COLORS.primary, // A bright color for the badge
    paddingVertical: 5, // Padding for height
    paddingHorizontal: 15, // Padding for width
    borderRadius: 20, // Rounded edges
    alignSelf: "flex-start", // Shrink to fit the content
  },
  badgeText: {
    color: "#FFFFFF", // White text for contrast
    fontWeight: "bold", // Bold text
    fontSize: 12, // Adjust font size as needed
  },
});

export default Cart