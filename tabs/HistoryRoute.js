import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { history } from '../data/utils';
import { COLORS } from '../constants';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { fetchCustomerOrders } from '../urls/urls';
import useAxios from '../network/useAxios';
import Toast from 'react-native-toast-message'; // Import Toast
import { test_url_images } from '../config/environment';

const HistoryRoute = () => {
    const navigation = useNavigation()

  const notify = (message, action) => {
    Toast.show({
        type: action,
        text1: action,
        text2: message
    });
}
    const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()
    const fetchDashboarfFunc = () => {
      responseFetch(fetchCustomerOrders({
        status:"history"
      }))
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
  const [data, setData] = useState([])
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
    
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoLeft}>
              <Image
                src={test_url_images + item.order_items[0]?.item?.image}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>Order #{item.uuid}</Text>
                <View style={styles.itemSubDetails}>
                  <Text style={styles.itemPrice}>€ {item.total_amount}</Text>
                  <Text style={styles.itemItems}> | {item.order_items?.length} Items</Text>
                </View>
              </View>
            </View>
            <Text style={styles.receiptText}>{item.receipt}</Text>
          </View>
          <View style={styles.actionsContainer}>
          <TouchableOpacity 
                onPress={()=>
                  navigation.navigate('TrackingOrders', { id: item.id})
                
                }
                style={styles.trackOrderButton}>
                <Text style={styles.trackOrderButtonText}>View Order</Text>
              </TouchableOpacity>
            
          </View>
        </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'column',
  },
  statusContainer: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    marginVertical: 12,
    flexDirection: 'row',
    paddingBottom: 4,
  },
  typeText: {
    fontSize: 14,
    fontFamily: "Sen Bold",
  },
  statusText: {
    fontSize: 14,
    fontFamily: "Sen Bold",
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemSubDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: "Sen Bold",
  },
  itemDate: {
    fontSize: 12,
    fontFamily: "Sen Regular",
    marginHorizontal: 2,
  },
  itemItems: {
    fontSize: 12,
    fontFamily: "Sen Regular",
  },
  receiptText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.gray5,
    fontFamily: "Sen Regular",
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  rateButton: {
    height: 38,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  rateButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: "Sen Regular",
  },
  reorderButton: {
    height: 38,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  reorderButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: "Sen Regular",
  },
});

export default HistoryRoute;
