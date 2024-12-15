import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from '../constants';
import { useTranslation } from 'react-i18next';

const CustomModalOffline = ({ modalVisible, setModalVisible, onPressGotIt }) => {
  const { t } = useTranslation();

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        activeOpacity={0.1}
        style={styles.modalContainer}
      >
<View style={styles.modalContent}>
  <LinearGradient
    colors={['#D1C4E9', '#9575CD', '#7E57C2']}
    style={styles.gradientContainer}
  >
    <Text style={styles.title}>{"We're sorry!"}</Text>
    <Text style={{ ...FONTS.h2, color: COLORS.white, marginVertical: 68 }}>
      {"Restaurant is offline right now"}
    </Text>
    <Text style={styles.discountText}>
      {"Sorry, the restaurant is currently offline. Please check back soon!"}
    </Text>

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

export default CustomModalOffline;
