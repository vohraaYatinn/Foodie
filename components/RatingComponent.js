import React, { useState } from 'react';
import { View } from 'react-native';
import StarRating from 'react-native-star-rating';

const RatingComponent = ({rating,setRating, data }) => {

  return (
    <View style={{ padding: 10 }}>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating || data?.rating}
        selectedStar={(rating) => setRating(rating)}
        fullStarColor={'gold'}
        emptyStarColor={'gray'}
      />
    </View>
  );
};

export default RatingComponent;
