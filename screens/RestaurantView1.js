import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, StatusBar, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images, icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-virtualized-view'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Octicons from "react-native-vector-icons/Octicons"
import Fontisto from "react-native-vector-icons/Fontisto"
import AntDesign from "react-native-vector-icons/AntDesign"
import { recentKeywords } from '../data/keywords'
import { popularBurgers } from '../data/foods'


const RestaurantView1 = () => {

const renderHeader = () => {
    const navigation = useNavigation()
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity 
                      onPress={()=>navigation.goBack()}
                      style={commonStyles.header1Icon}
                      >
                        <Image
                          resizeMode='contain'
                          source={icons.arrowLeft}
                          style={{height: 24, width: 24, tintColor: COLORS.black}}
                        />
                </TouchableOpacity>
            <Text style={{marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular"}}>Restaurant View</Text>
          </View>
           <TouchableOpacity
             style={commonStyles.header1Icon}
           >
                <Image
                  resizeMode='contain'
                  source={icons.more}
                  style={{height: 24, width: 24, tintColor: COLORS.black}}
                />
           </TouchableOpacity>
        </View>
    )
}

const renderRestaurantDetails = ()=>{
  const navigation = useNavigation();
  return (
    <View style={{marginTop: 16}}>
       <Image
        //  source={images.restaurants}
        source={images.restaurant4}
         resizeMode='cover'
         style={{
          width: SIZES.width - 32,
          height: 150,
          borderRadius: 30
         }}
       />

        <Text style={{
                fontSize: 18, 
                fontFamily: "Sen Bold",
                textTransform: 'capitalize',
                marginVertical: 10
                    }}>Spicy Restaurant</Text>
        <Text style={{
                fontSize: 13,
                fontFamily: "Sen Regular",
                color: COLORS.gray5
                }}>Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</Text>
        <View style={{flexDirection: "row", marginTop: 16}}>
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                         <Octicons name="star" size={24} color={COLORS.primary} />
                         <Text style={{marginLeft: 8}}>4.7</Text>
                      </View> 
                      <View style={{flexDirection: "row", alignItems: "center", marginHorizontal: SIZES.padding3}}>
                      <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={COLORS.primary} />
                         <Text style={{marginLeft: 8}}>Free</Text>
                      </View> 
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                      <Fontisto name="stopwatch" size={22} color={COLORS.primary} />
                         <Text style={{marginLeft: 8}}>20 min</Text>
                      </View> 
        </View>
        {/* Render Keyword related to restaurants */}
        <View style={{ marginVertical: 16}}>
          <FlatList
              horizontal={true}
              data={recentKeywords}
              keyExtractor={item=>item.id}
              renderItem=
              {({ item, index })=>(
                <TouchableOpacity
                onPress={()=>navigation.navigate("FoodByKeywords")}
                style={{
                  height: 46,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: COLORS.gray6,
                  borderRadius: 30,
                  paddingHorizontal: 10,
                  marginHorizontal: 8
                }}
                key={index}>
                  <Text style={{color: COLORS.tertiaryBlack, fontSize: 16}}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
        </View>
    </View>
  )
}

const renderFoodsByCategories = () =>{
  const navigation = useNavigation()
  return (
    <View>
      <Text style={{...FONTS.body3, marginBottom: 12}}>Burger (10) </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: SIZES.width-32,
        }}
      >
          {
            popularBurgers.map((item,index) =>(
              <TouchableOpacity
               onPress={() =>navigation.navigate("FoodDetails")}
               key={index}
              style={{
                flexDirection: 'column',
                paddingHorizontal: 2,
                paddingVertical: 4,
                height: "auto",
                width: 160,
                borderWidth: 1,
                borderColor: COLORS.gray6,
                borderRadius: 15,
                marginRight: "auto",
                marginBottom: 16
                }}>
                  <Image
                    source={item.image}
                    resizeMode='contain'
                    style={{width: "100%", height: 84, borderRadius: 15 }}
                  />
                  <Text style={{fontSize: 14, fontFamily: "bold", marginVertical: 4}}>{item.name}</Text>
                  <Text style={{fontSize: 13, fontFamily: "Sen Regular", marginVertical: 4}}>{item.restaurant}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <Text style={{fontSize: 15, fontFamily: "Sen Bold"}}>${item.price}</Text>
                      <TouchableOpacity 
                      style={{
                        height: 30, 
                        width: 30, 
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.primary
                        }}>
                            <AntDesign name="plus" size={12} color={COLORS.white} />
                      </TouchableOpacity>
                  </View>
              </TouchableOpacity>
            ))
          }
      </View>
    </View>
  )
}

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar hidden={true} />
      <View style={{flex: 1, marginHorizontal: 16}}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderRestaurantDetails()}
          {renderFoodsByCategories()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  checkboxContainer:{
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.gray6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginBottom: 12
    
  },
  roundedCheckBoxContainer:{
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
  selectedCheckbox:{
      backgroundColor: COLORS.primary
  },
  checkboxText:{
      color: COLORS.white,
      fontSize: 16,
      fontFamily: "Sen Regular"
  },
  starContainer:{
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.secondaryGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6
  }
})

export default RestaurantView1