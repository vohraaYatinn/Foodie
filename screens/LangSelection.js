import { View, Text, TouchableOpacity, StatusBar , Modal, StyleSheet} from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants'
import * as Animatable from "react-native-animatable"
import Input from '../components/Input'
import Button from '../components/Button'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import useAxios from '../network/useAxios'
import { signupCustomer } from '../urls/urls'
import Toast from 'react-native-toast-message'; // Import Toast
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next';

const isTestMode = true
const initialState = {
    inputValues: {
        fullName: isTestMode ? 'John Doe' : '',
        email: isTestMode ? 'example@gmail.com' : '',
        password: isTestMode ? '**********' : '',
        confirmPassword: isTestMode ? '**********' : ''
    },
    inputValidities: {
        fullName: false,
        email: false,
        password: false,
        confirmPassword: false
    },
    formIsValid: false,
}

const LangSelection = ({ navigation }) => {


  const [isModalVisible, setIsModalVisible] = useState(false);
  const addLanguage = async(token) => {
      await AsyncStorage.setItem('language', token)
  }
  const getLang = async(token) => {
      const lang = AsyncStorage.getItem('language')
      if (lang == "pt"){
        setSelectedLanguage("English")
      }
      else if(lang == "en"){
        setSelectedLanguage("Portuguese")
      }
  }
  useEffect(()=>{getLang(),[]})

  const addToken = async(token) => {
      await AsyncStorage.setItem('tokenJson', token)

  }
  

    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const notify = (message, action) =>{
        Toast.show({
            type: action,
            text1: action,
            text2: message
        });
    }
    const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()

    useEffect(() => {
        if (responseError?.response) {
            notify(responseError?.response?.data, "error")
        }
      }, [responseError])
    useEffect(()=>{
        if(responseLogin?.result == "success"){
            addToken(responseLogin?.token)
            notify(responseLogin?.message, "success")
            setTimeout(() => {
                navigation.navigate('LocationAccess')

            }, 1000);
        }
    },[responseLogin])
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)
            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const handleLanguageChange = async(lang) => {
      setSelectedLanguage(lang);
      setIsModalVisible(false);
      i18n.changeLanguage(lang === 'English' ? 'pt' : 'en');
      await addLanguage(lang === 'English' ? 'pt' : 'en')

  };
    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])
    const [selectedGender, setSelectedGender] = useState("");
    const { t, i18n } = useTranslation();

    const handleGenderChange = (value) => {
      setSelectedGender(value);
      inputChangedHandler('gender', value); 
      setIsModalVisible(false)
      // Adjust according to your input handler
  };
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.cover_purple }}>
      <StatusBar hidden={true} />
      <View style={commonStyles.header}>
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={commonStyles.backIcon}>
              <MaterialIcons name="keyboard-arrow-left" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={commonStyles.headerTitle}>{t('langPage.welcome')}</Text>
          <Text style={commonStyles.subHeaderTitle}>{t('langPage.restaurant_name')}</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={commonStyles.footer}>
          <KeyboardAwareScrollView>
              <View>
                  <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                      <Text style={commonStyles.inputHeader}>{t('langPage.default_language')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.dropdown}
                      onPress={() => setIsModalVisible(true)}
                  >
                      <Text style={styles.dropdownText}>
                          {selectedLanguage || t('langPage.select_language')}
                      </Text>
                  </TouchableOpacity>

                  <Modal
                      visible={isModalVisible}
                      transparent={true}
                      animationType="slide"
                      onRequestClose={() => setIsModalVisible(false)}
                  >
                      <View style={styles.modalOverlay}>
                          <View style={styles.modalContent}>
                              <TouchableOpacity
                                  style={styles.modalOption}
                                  onPress={() => handleLanguageChange("English")}
                              >
                                  <Text style={styles.optionText}>{t('langPage.english')}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                  style={styles.modalOption}
                                  onPress={() => handleLanguageChange("Portuguese")}
                              >
                                  <Text style={styles.optionText}>{t('langPage.portuguese')}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                  style={styles.modalOption}
                                  onPress={() => setIsModalVisible(false)}
                              >
                                  <Text style={styles.cancelText}>{t('langPage.cancel')}</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </Modal>
              </View>

              <Button
                  title={t('langPage.next')}
                  disabled={selectedLanguage === ""}
                  isLoading={isLoading}
                  filled
                  onPress={() => {
                      if (selectedLanguage !== "") {
                          navigation.navigate("Onboarding1");
                      }
                  }}
                  style={commonStyles.btn1}
              />
          </KeyboardAwareScrollView>
      </Animatable.View>
      <Toast />
  </SafeAreaView>
    )
}

export default LangSelection


const styles = StyleSheet.create({
  dropdown: {
      padding: 15,
      borderWidth: 1,
      borderColor: COLORS.black,
      borderRadius: 5,
  },
  dropdownText: {
      color: COLORS.black,
  },
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalContent: {
      width: 200,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 10,
  },
  modalOption: {
      padding: 15,
      alignItems: 'center',
  },
  optionText: {
      fontSize: 16,
      color: COLORS.black,
  },
  cancelText: {
      fontSize: 16,
      color: 'red',
  },
});