import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const CategoryCardV2 = ({ onPress, image, name, startingPrice }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.categoryCardContainer}
    >
      <Image
        source={image}
        resizeMode='cover'
        style={styles.image}
      />
      <Text style={styles.categoryName}>{name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Starting</Text>
        <Text style={styles.priceValue}>${startingPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCardContainer: {
    height: 172,
    paddingHorizontal: 8,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    shadowColor: '#F1F1F1',
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 0.1,
    borderRadius: 24,
    borderColor: COLORS.tertiaryGray,
    borderWidth: 1,
    backgroundColor: COLORS.white
  },
  image: {
    height: 104,
    width: 122,
    borderRadius: 15,
    marginTop: 10,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: "Sen Bold",
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: "Sen Regular",
  },
  priceValue: {
    fontSize: 16,
    fontFamily: "Sen Regular",
  },
});

export default CategoryCardV2;
