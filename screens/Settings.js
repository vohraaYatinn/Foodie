import { View, Text, TouchableOpacity, Image, StyleSheet, Switch, Modal, FlatList, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Settings = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const lang = AsyncStorage.getItem('language')
  

    /**
     * Render header component
     */
    function renderHeader() {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.header1Icon}
                >
                    <Image
                        resizeMode='contain'
                        source={icons.arrowLeft}
                        style={{ height: 24, width: 24, tintColor: COLORS.black }}
                    />
                </TouchableOpacity>
                <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular" }}>Settings</Text>
            </View>
        )
    }

    /***
     * Render App Settings
     */

    function renderAppSettings() {
        const [notificationEnabled, setNotificationEnabled] = useState(false);
        const [darkModeEnabled, setDarkModeEnabled] = useState(false);
        const [locationEnabled, setLocationEnabled] = useState(true);
        const [currency, setCurrency] = useState('EUR');
        const [language, setLanguage] = useState("Change");
        const [isCurrencyModalVisible, setCurrencyModalVisible] = useState(false);
        const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

        const handleNotificationToggle = () => {
            setNotificationEnabled((prevValue) => !prevValue);
        };

        const handleDarkModeToggle = () => {
            setDarkModeEnabled((prevValue) => !prevValue);
        };

        const handleLocationToggle = () => {
            setLocationEnabled((prevValue) => !prevValue);
          };
        
          const handleCurrencyChange = (value) => {
            setCurrency(value);
            setCurrencyModalVisible(false);
          };

          const addLanguage = async(token) => {
            
            await AsyncStorage.setItem('language', token)
        }
          const handleLanguageChange = async(value) => {
            setLanguage(value.name);
            setLanguageModalVisible(false);
            i18n.changeLanguage(value.name === 'English' ? 'en' : 'pt');
            await addLanguage(value.name === 'English' ? 'en' : 'pt')
          };



          const currencies = [
            { id: 'EUR', name: 'EUR - Euro' }
            // Add more currencies here
          ];
        
          const languages = [
            { id: 'pt', name: 'English' },
            { id: "en", name: "Portuguese" },
            // Add more languages here
          ];

          const renderCurrencyItem = ({ item }) => (
            <TouchableOpacity
              style={[styles.optionButton, currency === item.id && styles.optionButtonSelected]}
              onPress={() => handleCurrencyChange(item.id)}
            >
              <Text style={[styles.optionText, currency === item.id && styles.optionTextSelected]}>{item.name}</Text>
            </TouchableOpacity>
          );
        
          const renderLanguageItem = ({ item }) => (
            <TouchableOpacity
              style={[styles.optionButton, lang === item.id && styles.optionButtonSelected]}
              onPress={() => handleLanguageChange(item)}
            >
              <Text style={[styles.optionText, lang === item.id && styles.optionTextSelected]}>{item.name}</Text>
            </TouchableOpacity>
          );
       
        return (
          <View style={styles.container}>
           
      
      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>{t('setting_lang.Currency')}</Text>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => setCurrencyModalVisible(true)}
        >
          <Text style={styles.modalButtonText}>{currency}</Text>
        </TouchableOpacity>
        <Modal
          visible={isCurrencyModalVisible}
          animationType="slide"
          onRequestClose={() => setCurrencyModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t('setting_lang.Select_Currency')}</Text>
            <FlatList
              data={currencies}
              renderItem={renderCurrencyItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setCurrencyModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>

      <View style={styles.settingContainer}>
        <Text style={styles.settingLabel}>{t('setting_lang.language')}</Text>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => setLanguageModalVisible(true)}
        >
          <Text style={styles.modalButtonText}>{language}</Text>
        </TouchableOpacity>
        <Modal
          visible={isLanguageModalVisible}
          animationType="slide"
          onRequestClose={() => setLanguageModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <FlatList
              data={languages}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>

    </View>
    )
    }

  return (
   <SafeAreaView style={{
    flex: 1,
    backgroundColor: COLORS.white
   }}>
       <StatusBar hidden={true} />
        <View style={{
            marginHorizontal: 12
        }}>     
            {renderHeader()}
        </View>
        {renderAppSettings()}
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 16,
        marginTop: 16
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#333',
      },
      settingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      settingLabel: {
        fontSize: 16,
        color: '#333',
        fontFamily: "Sen Regular"
      },
      modalButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginRight: 10,
        borderWidth: 1,
        borderColor: COLORS.primary,
        
      },
      modalButtonText: {
        fontSize: 16,
        color: COLORS.primary,
        fontFamily: "Sen Regular"
      },
      modalContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 16,
      },
      modalTitle: {
        fontFamily: "Poppins SemiBold",
        fontSize: 16,
        marginBottom: 16,
        color: '#333',
      },
      modalCloseButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 16,
      },
      modalCloseButtonText: {
        fontSize: 16,
        fontFamily: "Poppins SemiBold",
        color: '#fff',
      },
      optionButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.5)',
        marginBottom: 8,
      },
      optionButtonSelected: {
        backgroundColor: COLORS.primary,
        borderWidth: 0,
      },
      optionText: {
        fontSize: 18,
        color: 'rgba(0,0,0,.5)',
      },
      optionTextSelected: {
        color: '#fff',
      },
  });

export default Settings