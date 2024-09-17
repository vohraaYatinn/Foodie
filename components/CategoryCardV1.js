import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../constants';

const CategoryCardV1 = ({name, image, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={image} resizeMode="contain" style={styles.image} />
      <Text style={{fontSize: 16, fontFamily: "Sen Bold"}}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: 'rgba(150, 150, 154,.4)',
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 0.1,
    borderRadius: 50,
    borderColor: COLORS.tertiaryGray,
    borderWidth: 1,
    backgroundColor: COLORS.white
  },
  image: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginRight: 10,
  },
});

export default CategoryCardV1;
