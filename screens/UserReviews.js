import { View, Text, TouchableOpacity, Image, FlatList, Platform  } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS,  SIZES,  icons } from "../constants"
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import { ScrollView } from 'react-native-virtualized-view'
import { reviews } from '../data/userReviews'
import ReviewStars from '../components/ReviewStars'
import Button from '../components/Button'

const UserReviews = () => {
  const renderHeader = () => {
    const navigation = useNavigation()
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
        }}>
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
            <Text style={{marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular"}}>Reviews</Text>
        </View>
    )
}

const renderReviews = ()=>{
  return (
    <View>
      <FlatList
        data={reviews}
        keyExtractor={item=>item.id}
        renderItem={({item,index}) =>(
          <View 
          key={index}
          style={{
            flexDirection: 'row',
            marginVertical: 12
          }}>
              <Image
                source={item.image}
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 24,
                  marginRight: 22
                }}
              />
              <View style={{
                flexDirection: 'column',
                width: SIZES.width - 108,
                borderRadius: 15,
                paddingVertical: 12,
                paddingLeft: 12,
                paddingRight: 12,
                backgroundColor: COLORS.gray
                }}>
                <Text style={{
                  fontSize: 12,
                  fontFamily: "Sen Regular",
                  color: COLORS.gray5
                }}>{item.date}</Text>
                <Text style={{
                  fontSize: 14,
                  fontFamily: "Poppins SemiBold",
                  marginVertical: 6
                }}>{item.title}</Text>
                <ReviewStars review={item.rating} />
                <Text style={{
                  fontSize: 12,
                  fontFamily: "Sen Regular",
                  marginTop: 6
                }}>{item.review}</Text>
              </View>
          </View>
        )}  
      />
    </View>
  )
}

const renderActionsButton = () =>{
    return (
        <Button
        title={Platform.OS == 'ios' ? "Rate us on App Store" : "Rate Us on Play Store"}
        onPress={()=> console.log("Action to Open Play Store or App Store")}
        filled
        style={{
          width: SIZES.width - 32,
          backgroundColor: COLORS.primary,
          borderColor: COLORS.primary,
          marginVertical: 12
        }}
      />
    )
}
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white2}}>
    <View style={{flex: 1, marginHorizontal: 16}}>
        {renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderReviews()}
          {renderActionsButton()}
        </ScrollView>
    </View>
    </SafeAreaView>
  )
}

export default UserReviews