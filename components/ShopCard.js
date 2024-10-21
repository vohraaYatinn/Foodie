import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { COLORS, SIZES } from '../constants';

const ShopCard = ({ image, onPress, name,description, keywords, rating, shipping, deliveryTime }) => {
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
      <View style={styles.keywordsContainer}>
      
          <Text style={styles.keywordText}>
            {description?.slice(0,90)}
          </Text>
     
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <View style={styles.iconTextContainer}>
            <Octicons name="star" size={24} color={COLORS.primary} />
            <Text style={styles.infoText}>{4}</Text>
          </View>
          <View style={styles.iconTextContainer}>
            <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={COLORS.primary} />
            <Text style={styles.infoText}>{"shipping"}</Text>
          </View>
          <View style={styles.iconTextContainer}>
            <Fontisto name="stopwatch" size={22} color={COLORS.primary} />
            <Text style={styles.infoText}>{"10"} min</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shopCardContainer: {
    width: SIZES.width - 32,
    borderColor: COLORS.tertiaryGray,
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
    fontSize: 18,
    fontFamily: "Sen Regular",
    marginVertical: 6,
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
    marginHorizontal: SIZES.padding3,
  },
  infoText: {
    marginLeft: 8,
  },
});

export default ShopCard;
