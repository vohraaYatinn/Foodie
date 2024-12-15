import {View, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {ScrollView} from 'react-native-virtualized-view';
import {restaurants} from '../data/restaurants';
import {COLORS} from '../constants';
import ShopCard from '../components/ShopCard';
import useAxios from '../network/useAxios';
import { getAllMenu } from '../urls/urls';
import Toast from 'react-native-toast-message'; // Import Toast
import { test_url_images } from '../config/environment';

const OpenShops = ({navigation}) => {
  const notify = (message, action) => {
    Toast.show({
        type: action,
        text1: action,
        text2: message
    });
}
const [data, setData] = useState({})
  const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()
  const fetchDashboarfFunc = () => {
    responseFetch(getAllMenu())
}
useEffect(()=>{
  fetchDashboarfFunc()
},[])
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
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, padding: 16, backgroundColor: COLORS.white}}>
        <Header title="All Available Items" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            nestedScrollEnabled
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <ShopCard
              image={test_url_images + item?.image}
              name={item?.name}
              price={item?.price}
              description={item?.description}
              keywords={item.keywords}
              rating={item.rating}
              shipping={item.shipping}
              deliveryTime={item.deliveryTime}
              onPress={() =>navigation.navigate('FoodDetails', { itemId: item?.id })}
            />
            )}
          />
        </ScrollView>
      </View>
      <Toast/>
    </SafeAreaView>
  );
};

export default OpenShops;