import React from 'react';
import { View } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLORS } from '../constants';

const ReviewStars = ({ review }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < review; i++) {
      stars.push(
        <View
          style={{marginRight: 4}}
          key={i}
        >
            <FontAwesome key={i} name="star" size={24} color={COLORS.primary} />
        </View>
      
      );
    }
    return stars;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      {renderStars()}
    </View>
  );
};

export default ReviewStars;