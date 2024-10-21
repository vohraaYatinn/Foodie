import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS } from '../constants';

export default function VerticalStepper({content}) {

  const dataCheck = {
    "pending" :  <View style={styles.stepContainer}>
    <View style={[styles.stepIndicator, {  backgroundColor: COLORS.primary }]} />
    <Text style={styles.stepText}>Waiting for restaurant to accept</Text>
  </View>,
    "accepted" :  <View style={styles.stepContainer}>
    <View style={[styles.stepIndicator, {  backgroundColor: COLORS.primary }]} />
    <Text style={styles.stepText}>Your order has been accepted</Text>
  </View>,
    "delivered" :  <View style={styles.stepContainer}>
    <View style={[styles.stepIndicator, {  backgroundColor: COLORS.primary }]} />
    <Text style={styles.stepText}>Your order has been delivered</Text>
  </View>,
    "cancelled" :  <View style={styles.stepContainer}>
    <View style={[styles.stepIndicator, {  backgroundColor: COLORS.primary }]} />
    <Text style={styles.stepText}>Your order has been cancelled</Text>
  </View>,
    "Ondelivery" :  <View style={styles.stepContainer}>
    <View style={[styles.stepIndicator, {  backgroundColor: COLORS.primary }]} />
    <Text style={styles.stepText}>Your order has been out for delivery</Text>
  </View>,
  }

  return (
    <View style={styles.container}>

      {content?.map((item)=>{
        return(
          dataCheck[item?.status]
        )
      })}
    

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  stepText: {
    fontSize: 13,
    color: COLORS.black,
    fontFamily: "Sen Regular"
  },
});
