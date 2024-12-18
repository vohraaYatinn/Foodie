import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { test_url_images } from '../../config/environment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddOnProductSlider = ({ products, addToCart }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { width } = Dimensions.get('window');

  const renderItem = ({ item }) => (
    <TouchableOpacity
    style={styles.card}
    onPress={() => addToCart(item.id)} // Run the function when the card is clicked
  >
    <Image source={{ uri: test_url_images + item?.image }} style={styles.image} />
    <Text style={styles.title}>
      {item.name.length > 12 ? `${item.name.slice(0, 12)}...` : item.name}
    </Text>
    <Text style={styles.price}>${item.price}</Text>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add-On Products</Text>
      <Carousel
        data={products}
        renderItem={renderItem}
        sliderWidth={400}
        itemWidth={220}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
        inactiveSlideShift={0} 
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Text style={styles.pagination}>
        {activeSlide + 1} / {products.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginVertical: 2, // Reduced margin
    },
    header: {
      fontSize: 16, // Smaller header font
      fontWeight: 'bold',
      marginBottom: 5,
      textAlign: 'center',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 10, // Smaller padding
      alignItems: 'center',
      width: '80%', // Smaller width
      elevation: 2, // Add shadow for better appearance
    },
    image: {
      width: 40, // Smaller image
      height: 40,
      borderRadius: 8,
    },
    title: {
      fontSize: 12, // Smaller title font
      fontWeight: '500',
      marginTop: 5,
    },
    price: {
      fontSize: 12, // Smaller price font
      color: 'green',
      marginTop: 3,
    },
    pagination: {
      textAlign: 'center',
      marginTop: 5,
      fontSize: 12,
    },
  });
export default AddOnProductSlider;
