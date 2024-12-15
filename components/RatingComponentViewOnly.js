import React, { useState } from 'react';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating';

const RatingComponentViewOnly = ({rating }) => {

  return (
    <View style={{ padding: 5 }}>
      <StarRating
        
        disabled={true}
        maxStars={5}
        rating={rating}
        fullStarColor={'gold'}
        starSize={20}
        emptyStarColor={'gray'}
      />
    </View>
  );
};

export default RatingComponentViewOnly;
