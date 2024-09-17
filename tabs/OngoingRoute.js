import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { orders } from '../data/utils';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';

const OngoingRoute = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.typeContainer}>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.infoLeft}>
                <Image
                  source={item.image}
                  style={styles.itemImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.itemSubDetails}>
                    <Text style={styles.itemPrice}>${item.price}</Text>
                    <Text style={styles.itemItems}> | {item.numberOfItems} Items</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.receiptText}>{item.receipt}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                onPress={()=>navigation.navigate("TrackingOrders")}
                style={styles.trackOrderButton}>
                <Text style={styles.trackOrderButtonText}>Track Order</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>navigation.navigate("CancelOrders")}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'column',
  },
  typeContainer: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    marginVertical: 12,
    paddingBottom: 4,
  },
  typeText: {
    fontSize: 14,
    fontFamily: "Sen Bold",
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    height: 60,
    width: 60,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemSubDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: "Sen Bold",
  },
  itemItems: {
    fontSize: 12,
    fontFamily: "Sen Regular",
  },
  receiptText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.gray5,
    fontFamily: "Sen Regular",
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 18,
  },
  trackOrderButton: {
    height: 38,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  trackOrderButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: "Sen Regular",
  },
  cancelButton: {
    height: 38,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: "Sen Regular",
  },
});

export default OngoingRoute;
