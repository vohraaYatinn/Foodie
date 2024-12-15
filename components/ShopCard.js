import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { COLORS, SIZES } from '../constants';
import RatingComponent from './RatingComponent';
import RatingComponentViewOnly from './RatingComponentViewOnly';

const ShopCard = ({ item,image, onPress, name,description, keywords, rating, shipping, deliveryTime, price }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.shopCardContainer}
    >
      <Image
        src={image}
        style={styles.image}
      />
      <Text style={styles.shopName}>{name}</Text>
     {
     !item?.is_available &&       <Text style={styles.shopNameRed}>(Out of Stock)</Text>


     }
     {
     item?.is_buy_one &&   
     
<View style={{ width: "50%", alignItems: "center" }}>
  <View style={styles.badge}>
    <Text style={styles.badgeText}>(BUY 1 GET 1 FREE)</Text>
  </View>
</View>
     


     }
      <View style={{width:"40%"}}>
      <RatingComponentViewOnly rating={rating} />

      </View>
      <View style={styles.container}>
      {/* Original price with strikethrough */}
      <Text style={styles.strikeThroughPrice}>€ {(price * 1.1).toFixed(2)}</Text>
      {/* Current price */}
      <Text style={styles.priceName}>€ {price}</Text>
    </View>


      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
     
          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={COLORS.primary} />
            <Text style={styles.infoText}>{"shipping"}</Text>
          </View>
          <View style={styles.iconTextContainer}>
            <Fontisto name="stopwatch" size={22} color={COLORS.primary} />
            <Text style={styles.infoText}>{"15-20"} min</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shopCardContainer: {
    width: SIZES.width - 32,
    borderColor: COLORS.secondaryGray,
    borderWidth: 1,
    paddingBottom: 2,
    marginBottom: 20,
    borderRadius: 15,
    
  },
  image: {
    width: SIZES.width - 32,
    height: 136,
    borderRadius: 15,
  },
  shopName: {
    fontSize: 16,
    fontFamily: "Sen Regular",
    marginVertical: 6,
  },
  shopNameBuyone: {
    fontSize: 16,
    fontFamily: "Sen Regular",
    color:"white",
    backgroundColor:COLORS.primary,
    width:5
  },
  shopNameRed: {
    fontSize: 16,
    fontFamily: "Sen Regular",
    color:"red"
  },
  priceName: {
    fontSize: 18,
    fontFamily: "Sen Regular",
    marginBottom:10
  },
  keywordsContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  keywordText: {
    fontSize: 14,
    color: COLORS.gray5,
    textTransform: 'capitalize',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding3,
  },
  infoText: {
    marginLeft: 8,
  },
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
  strikeThroughPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    marginRight: 8,
    fontSize: 16,
  },
  priceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ShopCard;
