import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from '../constants';
import { useTranslation } from 'react-i18next';

const CustomModal = ({ modalVisible, setModalVisible, onPressGotIt, code }) => {
  const { t } = useTranslation();

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        onPressOut={() => setModalVisible(false)}
        activeOpacity={0.1}
        style={styles.modalContainer}
      >
<View style={styles.modalContent}>
  <LinearGradient
    colors={['#D1C4E9', '#9575CD', '#7E57C2']}
    style={styles.gradientContainer}
  >
    <Text style={styles.title}>{t('welcomeModal.hurry_offers')}</Text>
    <Text style={{ ...FONTS.h2, color: COLORS.white, marginVertical: 68 }}>
      {t('welcomeModal.order_favorite_dishes')}
    </Text>
    <Text style={styles.discountText}>
      {t('welcomeModal.discount_text')}
    </Text>
    <TouchableOpacity
      onPress={onPressGotIt}
      style={styles.gotItButton}
    >
      <Text style={styles.gotItButtonText}>{t('welcomeModal.got_it')}</Text>
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
