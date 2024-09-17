import {View, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {ScrollView} from 'react-native-virtualized-view';
import {restaurants} from '../data/restaurants';
import {COLORS} from '../constants';
import ShopCard from '../components/ShopCard';

const OpenShops = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={{flex: 1, padding: 16, backgroundColor: COLORS.white}}>
        <Header title="Open Shops" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            nestedScrollEnabled
            data={restaurants}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <ShopCard
                image={item.image}
                keywords={item.keywords}
                rating={item.rating}
                shipping={item.shipping}
                deliveryTime={item.deliveryTime}
                name={item.name}
                onPress={() => console.log('Pressed')}
              />
            )}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OpenShops;