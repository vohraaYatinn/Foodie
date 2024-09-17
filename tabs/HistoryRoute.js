import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { history } from '../data/utils';
import { COLORS } from '../constants';
import { useNavigation } from '@react-navigation/native';

const HistoryRoute = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.statusContainer}>
              <Text style={styles.typeText}>{item.type}</Text>
              <Text style={[styles.statusText, { color: item.status == "Completed" ? COLORS.green : COLORS.red, marginLeft: 12 }]}>
                {item.status}
              </Text>
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
                    <Text style={styles.itemDate}> | {item.date}</Text>
                    <Text style={styles.itemItems}> | {item.numberOfItems} Items</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.receiptText}>{item.receipt}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                onPress={()=>navigation.navigate("AddReviews")}
                style={styles.rateButton}>
                <Text style={styles.rateButtonText}>Rate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reorderButton}>
                <Text style={styles.reorderButtonText}>Re-Order</Text>
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
  statusContainer: {
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    marginVertical: 12,
    flexDirection: 'row',
    paddingBottom: 4,
  },
  typeText: {
    fontSize: 14,
    fontFamily: "Sen Bold",
  },
  statusText: {
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
  itemDate: {
    fontSize: 12,
    fontFamily: "Sen Regular",
    marginHorizontal: 2,
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
  rateButton: {
    height: 38,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  rateButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: "Sen Regular",
  },
  reorderButton: {
    height: 38,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  reorderButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: "Sen Regular",
  },
});

export default HistoryRoute;
