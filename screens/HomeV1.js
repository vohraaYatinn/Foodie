import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState , useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { COLORS, SIZES, icons } from '../constants';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-virtualized-view';
import { categories } from '../data/categories';
import { restaurants } from '../data/restaurants';
import CustomModal from '../components/CustomModal';
import SubHeader from '../components/SubHeader';
import CategoryCardV1 from '../components/CategoryCardV1';
import ShopCard from '../components/ShopCard';
import useAxios from '../network/useAxios';
import { fetchDashboard } from '../urls/urls';
import Toast from 'react-native-toast-message'; // Import Toast
import { test_url_images } from '../config/environment';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeV1 = ({ navigation }) => {
  const { t , i18n} = useTranslation();

  const notify = (message, action) => {
    Toast.show({
        type: action,
        text1: action,
        text2: message
    });
}
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()
  const fetchDashboarfFunc = () => {
    responseFetch(fetchDashboard())
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

const handleLanguageChange = async() => {
  const lang = await AsyncStorage.getItem('language')
  i18n.changeLanguage(lang);
};
useEffect(()=>{handleLanguageChange()},[])
const [data, setData] = useState({
  category:[],
  order:[]
})
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
  const handlePressGotIt = () => {
    // Handle the logic when the "GOT IT" button is pressed
    // For example, you can close the modal or perform any other action
    setModalVisible(false);
  };

  const handleSearch = text => {
    navigation.navigate('Search', { otherParam: text, keywords: data?.category});

  };

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning!');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon!');
    } else {
      setGreeting('Good Evening!');
    }
  }, []);


  const renderFoodCategories = () => {
    return (
      <View>
        <SubHeader
          title={t('home.all_categories')}
          onPress={() => console.log('All Categories')}
        />
        <FlatList
        
          horizontal={true}      
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
    
          data={data?.category||[] }
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <CategoryCardV1
              name={item.name}
          
              onPress={() => 

{ navigation.navigate('FoodByKeywords', { itemId: item.id, name:item.name });}
              }
            />
          )}
        />
      </View>
    );
  };
  const renderSearchBar = () => {
    return (
      <View style={styles.searchBarContainer}                   
>
        <View
          style={{
            marginHorizontal: SIZES.padding,
          }}>
          <Ionicons name="search" size={24} color={COLORS.gray4} />
        </View>
        <TextInput

          placeholder={t('home.search_placeholder')}
          onChangeText={handleSearch}
          placeholderTextColor={COLORS.gray5}
          value={searchQuery}
        />
      </View>
    );
  };

  const renderRestaurants = () => {
    return (
      <View style={{ height: 'auto'}}>
        <SubHeader
          title={t('home.best_seller')}
          onPress={() => navigation.navigate("OpenShops")}
          seeAll = {true}
        />

        <FlatList
          nestedScrollEnabled
          data={data?.order }
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ShopCard
              image={test_url_images + item?.menu?.image}
              name={item?.menu?.name}
              description={item?.menu?.description}
              keywords={item.keywords}
              rating={item.rating}
              shipping={item.shipping}
              deliveryTime={item.deliveryTime}

              onPress={() =>navigation.navigate('FoodDetails', { itemId: item?.menu?.id })}
            />
          )}
        />
      </View>
    );
  };
  return (
<SafeAreaView style={styles.area}>
  <View style={{ flex: 1, marginHorizontal: 16 }}>
    <StatusBar hidden={true} />
    <View style={styles.headerContainer}>
      <View style={styles.itemCenter}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.menuIconContainer}>
          <Image source={icons.menu} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'column', marginLeft: 12 }}>
          <Text style={styles.deliverTo}>{t('home.deliver_to')}</Text>
          <View style={styles.itemCenter}>
            <Text style={styles.location}>{data?.user?.active_addresses?.[0]?.city}</Text>
            <Image source={icons.arrowDown2} style={styles.arrowDown} />
          </View>
        </View>
      </View>

      <View style={styles.cartContainer}>
        <View>
          <Feather name="shopping-bag" size={24} color={COLORS.white} onPress={() => navigation.navigate("Cart")} />
        </View>
      </View>
    </View>

    <View style={styles.greetingsContainer}>
      <Text style={styles.greetingsName}>{t('home.greetings_name')}{data?.user?.full_name },{" "}</Text>
      <Text style={styles.greetingsTime}>{greeting}</Text>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      {renderSearchBar()}
      {renderFoodCategories()}
      {renderRestaurants()}
    </ScrollView>
  </View>
  <CustomModal
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    onPressGotIt={handlePressGotIt}
    code={t('home.favorite_dishes')}
  />
  <Toast />
</SafeAreaView>

  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  menuIconContainer: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryGray,
  },
  menuIcon: {
    height: 24,
    width: 24,
  },
  deliverTo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  location: {
    fontSize: 14,
    fontWeight: 'regular',
  },
  arrowDown: {
    height: 12,
    width: 12,
    marginLeft: 4,
  },
  cartContainer: {
    height: 45,
    width: 45,
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.tertiaryBlack,
  },
  cartIconContainer: {
    position: 'absolute',
    top: -16,
    left: 12,
    backgroundColor: COLORS.primary,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12.5,
    zIndex: 999,
  },
  cartNum: {
    fontSize: 16,
    color: COLORS.white,
  },
  greetingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  greetingsName: {
    fontSize: 16,
    fontFamily: "Sen Regular",
  },
  greetingsTime: {
    fontSize: 16,
    fontFamily: "Sen Bold",
  },
  itemCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarContainer: {
    width: SIZES.width - 32,
    height: 62,
    borderRadius: 10,
    backgroundColor: COLORS.tertiaryGray,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default HomeV1;
