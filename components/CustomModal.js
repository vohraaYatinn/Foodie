import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from '../constants';

const CustomModal = ({ modalVisible, setModalVisible, onPressGotIt, code }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        onPressOut={() => setModalVisible(false)}
        activeOpacity={0.1}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <LinearGradient
            colors={['#FFEB34', '#E76F00', '#E76F00']}
            style={styles.gradientContainer}
          >
            <Text style={styles.title}>Hurry Offers!</Text>
            <Text style={{ ...FONTS.h2, color: COLORS.white, marginVertical: 68 }}>{code}</Text>
            <Text style={styles.discountText}>Use the coupon to get 25% discount</Text>
            <TouchableOpacity
              onPress={onPressGotIt}
              style={styles.gotItButton}
            >
              <Text style={styles.gotItButtonText}>GOT IT</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: SIZES.height,
    width: SIZES.width,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientContainer: {
    height: 400,
    width: SIZES.width * 0.8,
    borderRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'extraBold',
    marginTop: 30,
    color: COLORS.white,
  },
  discountText: {
    fontSize: 13,
    fontFamily: "Sen Regular",
    color: COLORS.white,
  },
  gotItButton: {
    height: 62,
    width: SIZES.width * 0.72,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 38,
  },
  gotItButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
  },
});

export default CustomModal;
