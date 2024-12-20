import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons, SIZES, COLORS, FONTS } from '../constants'
import { orderList } from '../data/utils'
import RBSheet from "react-native-raw-bottom-sheet"
import { useNavigation } from '@react-navigation/native'
import RatingComponent from '../components/RatingComponent'

const TrackingOrderV1 = ({ navigation }) => {
  const navigation2 = useNavigation();

  const bottomSheetRef = useRef(null);

  useEffect(() => {
    bottomSheetRef.current.open(); // Open the bottom sheet on component mount
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <View 
                onPress={() => navigation2.goBack()}

      style={{
        position: 'absolute',
        marginHorizontal: 16,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        top: 22,
        zIndex: 999
      }}>
        <TouchableOpacity
          onPress={() => navigation2.goBack()}
          style={{
            height: 45,
            width: 45,
            borderRadius: 22.5,
            backgroundColor: COLORS.black,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16
          }}
        >
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
        <Text style={{ ...FONTS.body3 }}>Track Order</Text>
      </View>

      <RBSheet
        ref={bottomSheetRef}
        height={150}
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
          flexDirection: 'row'
        }}>
          <View style={{
            marginRight: 12
          }}>
            <Image
              // source={images.food}
              source={images.pizza1}
              style={{
                height: 80,
                width: 80,
                borderRadius: 12
              }}
            />
          </View>
          <View style={{
            flexDirection: 'column',
          }}>
            <TouchableOpacity onPress={() => navigation2.goBack()}
            >
            <Text style={{ ...FONTS.h4 }} >Uttora Coffee House</Text>
            </TouchableOpacity>
            <Text style={styles.body3}>Orderd at 06 Sept, 10:00pm</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.h3}>2x</Text>
              <Text style={styles.body3}>Burger</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.h3}>4x</Text>
              <Text style={styles.body3}>Sandwitch</Text>
            </View>
          </View>
        </View>
      </RBSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
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
    // marginBottom: -15
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
  }
})

export default TrackingOrderV1