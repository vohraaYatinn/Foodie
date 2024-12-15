import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, icons } from '../constants'
import Feather from "react-native-vector-icons/Feather"
import Ionicons from "react-native-vector-icons/Ionicons"
import { ScrollView } from 'react-native-virtualized-view'
import { categories } from '../data/categories'
import { restaurants } from '../data/restaurants'
import CustomModal from '../components/CustomModal'
import SubHeader from '../components/SubHeader'
import ShopCard from '../components/ShopCard'
import CategoryCardV2 from '../components/CategoryCardV2'

const HomeV2 = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  const handlePressGotIt = () => {
    // Handle the logic when the "GOT IT" button is pressed
    // For example, you can close the modal or perform any other action
    setModalVisible(false);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };


  const renderFoodCategories = () => {
    return (
      <View>
       <SubHeader
          title="All Categories"
        />

        <FlatList
          horizontal={true}
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <CategoryCardV2
            image={item.image} 
            name={item.name} 
            startingPrice={item.startingPrice}
            />
          )}
        />
      </View>
    )
  }
  const renderSearchBar = () => {
    return (
      <View style={styles.searchBarContainer}>
        <View
          style={{
            marginHorizontal: SIZES.padding,
          }}>
          <Ionicons name="search" size={24} color={COLORS.gray4} />
        </View>
        <TextInput
          placeholder="Search dishes, restaurants"
          onChangeText={handleSearch}
          placeholderTextColor={COLORS.gray5}
        />
      </View>
    );
  };

  const renderRestaurants = () => {
    return (
      <View style={{ height: "auto" }}>
       <SubHeader
          title="Open Restaurants"
          onPress={() => navigation.navigate("OpenShops")}
        />
         <FlatList
          nestedScrollEnabled
          data={restaurants}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <ShopCard
              image={item.image}
              name={item.name}
              keywords={item.keywords}
              rating={item.rating}
              shipping={item.shipping}
              deliveryTime={item.deliveryTime}
            />
          )}
        />
      </View>
    )
  }
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
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 12,
              }}>
              <Text style={styles.deliverTo}>DELIVER TO</Text>
              <View style={styles.itemCenter}>
                <Text style={styles.location}>Halab lab office</Text>
                <Image source={icons.arrowDown2} style={styles.arrowDown} />
              </View>
            </View>
          </View>

          <View style={styles.cartContainer}>
            <View>
              <View style={styles.cartIconContainer}>
                <Text style={styles.cartNum}>2</Text>
              </View>
              <Feather name="shopping-bag" size={24} color={COLORS.white} />
            </View>
          </View>
        </View>

        <View style={styles.greetingsContainer}>
          <Text style={styles.greetingsName}>Hey Halal,</Text>
          <Text style={styles.greetingsTime}>Good Afternoon!</Text>
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
        code="#1243CD2"
      />
    </SafeAreaView>
  )
}

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
})

export default HomeV2