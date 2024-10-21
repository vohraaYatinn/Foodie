import { View, Text, FlatList, TouchableOpacity , Image, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { useNavigation } from '@react-navigation/native'
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Octicons from "react-native-vector-icons/Octicons"
import { popularBurgers } from '../data/foods'
import { restaurants } from '../data/restaurants'
import { ScrollView } from 'react-native-virtualized-view'
import Toast from 'react-native-toast-message'; // Import Toast
import { test_url_images } from '../config/environment';
import { CategoryMenu } from '../urls/urls'
import useAxios from '../network/useAxios'

const FoodByKeywords = ({route}) => {
  const { itemId, name } = route.params;
  const [data, setData] = useState([])

  const notify = (message, action) => {
    Toast.show({
        type: action,
        text1: action,
        text2: message
    });
}

  const [responseDish, ErrorDish, LoadingDish, FetchDish] = useAxios()
  const searchDished = () => {
    FetchDish(CategoryMenu({
      categoryId : itemId
    }))
}
useEffect(()=>{
  if(itemId){
    searchDished()
  }
},[itemId])
useEffect(() => {
  if (ErrorDish?.response) {
      notify(ErrorDish?.response?.data, "error")
  }
}, [ErrorDish])

useEffect(()=>{
  if(responseDish?.result == "success"){
    setData(responseDish?.data)
  }
},[responseDish])




  useEffect(()=>{},[])
    const renderHeader = ()=>{
        const navigation = useNavigation()
        return (
            <View style={commonStyles.header1}>
                <View style={{flexDirection: 'row',}}>
                    <TouchableOpacity 
                       onPress={()=>navigation.goBack()}
                       style={commonStyles.header1Icon}
                       >
                        <Image
                          src='contain'
                          source={icons.arrowLeft}
                          style={{height: 24, width: 24, tintColor: COLORS.black}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        height: 45, 
                        borderRadius: 33,
                        borderWidth: 1,
                        borderColor: COLORS.gray6,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 12,
                        justifyContent: 'center',
                        marginLeft: 8
                    }}
                    >
                        <Text style={{
                            fontSize: 12,
                            fontFamily: "Sen Bold"
                        }}>{name}</Text>
                        <View>
                            <Image
                              source={icons.arrowDown2}
                              style={{
                                width: 12,
                                height: 12,
                                marginLeft: 6,
                                tintColor: COLORS.primary
                              }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                 
                </View>
            </View>
        )
    }

    const renderFoods = () =>{
      const navigation = useNavigation()
      return (
        <View style={{marginVertical: 22}}>
          <Text style={{...FONTS.body3, marginBottom: 12}}>Foods in {name}</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: SIZES.width-32,
            }}
          >
              {
                data.map((item,index) =>(
                  <TouchableOpacity
                   onPress={() =>navigation.navigate('FoodDetails', { itemId: item?.id })}
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
                    marginBottom: 8
                    }}>
                      <Image
                        src={test_url_images + item.image}
                        resizeMode='contain'
                        style={{width: "100%", height: 84, borderRadius: 15 }}
                      />
                      <Text style={{fontSize: 14, fontFamily: "bold", marginVertical: 4}}>{item.name}</Text>
                      <Text style={{fontSize: 13, fontFamily: "Sen Regular", marginVertical: 4}}>{item.category.name}</Text>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                          <Text style={{fontSize: 15, fontFamily: "Sen Bold"}}>${item.price}</Text>
                          <TouchableOpacity 
                          onPress={() =>console.log("Add to cart")}
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
        {renderFoods()}
      
        </ScrollView>
      </View>
      <Toast/>
   </SafeAreaView>
  )
}

export default FoodByKeywords