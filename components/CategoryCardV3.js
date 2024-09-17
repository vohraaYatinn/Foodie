import React from 'react';
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const CategoryCardV3 = ({ image, onPress, name }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.categoryCardContainer}
    >
      <Image
        source={image}
        style={styles.image}
      />
      <Text style={styles.categoryName}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCardContainer: {
    height: 140,
    paddingHorizontal: 8,
    marginHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
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
    height: 81,
    width: 96,
    borderRadius: 15,
    marginTop: 10,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: "Sen Bold",
    marginTop: 14,
  },
});

export default CategoryCardV3;
