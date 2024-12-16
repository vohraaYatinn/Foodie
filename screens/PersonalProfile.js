import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-virtualized-view'
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import useAxios from '../network/useAxios'
import Toast from 'react-native-toast-message'; // Import Toast
import { fetchUserDetails } from '../urls/urls'
import { test_url_images } from '../config/environment'
import { useTranslation } from "react-i18next";

const PersonalProfile = () => {
        const { t } = useTranslation();

    const renderHeader = () => {
        const navigation = useNavigation()
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 20,
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular" }}>Personal Profile</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("EditProfile")}
                >
                    <Text style={{
                        fontSize: 14,
                        textTransform: 'uppercase',
                        color: COLORS.primary,
                        fontFamily: "Sen Bold"
                    }}>Edit</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderUserProfile = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                {data?.image && test_url_images ? 
                  <Image
                  src={test_url_images + data?.image}
                  resizeMode='contain'
                  style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50
                  }}
              /> :
              <Image
              source={images.avatar2}
              resizeMode='contain'
              style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50
              }}
          />
            
            }
              
                <View style={{ marginLeft: 12 }}>
                    <Text style={{ ...FONTS.h4 }}>{data?.full_name}</Text>
                    <Text style={{
                        fontSize: 12,
                        fontFamily: "Sen Regular",
                        color: COLORS.gray5,
                        marginVertical: 6
                    }}>I love fast food</Text>
                </View>
            </View>
        )
    }

    const renderUserProfileInfo = () => {
        return (
            <View style={{ flexDirection: 'column' }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.subContainer}>
                    <View style={styles.subLeftContainer}>
                        <View style={styles.rounded}>
                            <Feather name="user" size={24} color="#413DFB" />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.boldBody}>{t("personal_profile.full_name")}</Text>
                            <Text style={styles.textBody}>{data?.full_name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subContainer}>
                    <View style={styles.subLeftContainer}>
                        <View style={styles.rounded}>
                            <MaterialCommunityIcons name="email-outline" size={24} color="#413DFB" />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.boldBody}>{t("personal_profile.email")}</Text>
                            <Text style={styles.textBody}>{data?.email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.subContainer}>
                    <View style={styles.subLeftContainer}>
                        <View style={styles.rounded}>
                            <Feather name="phone" size={24} color="#369BFF" />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.boldBody}>{t("personal_profile.phone_number")}</Text>
                            <Text style={styles.textBody}>+351 - {data?.phone_number}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

        )
    }


    const notify = (message, action) => {
        Toast.show({
            type: action,
            text1: action,
            text2: message
        });
    }
    const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()
    const [data, setData] = useState({})
    const fetchUserFunc = () => {
        responseFetch(fetchUserDetails())
    }
    useEffect(()=>{
      fetchUserFunc()
    },[])
    useEffect(() => {
        if (responseError?.response) {
            notify(responseError?.response?.data, "error")
        }
      }, [responseError])
      useEffect(()=>{
        if(responseLogin?.result == "success"){
          setData(responseLogin?.data)
        }
      },[responseLogin])

      
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.white }}>
                <StatusBar hidden={true} />
            <View style={{
                flex: 1,
                marginHorizontal: 16
            }}>
                {renderHeader()}
                <ScrollView>
                    {renderUserProfile()}
                    {renderUserProfileInfo()}
                </ScrollView>
            </View>
            <Toast/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray7,
        borderRadius: 16,
        width: SIZES.width - 32,
        paddingVertical: 8,
        marginBottom: 12
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.gray7,
        marginVertical: 8
    },
    subLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rounded: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12
    },
    textBody: {
        fontSize: 12,
        fontFamily: "Sen Regular",
        color: "#32343E"
    },
    iconRight: {
        height: 16,
        width: 16,
        marginRight: 8,
        tintColor: "#747783"
    },
    boldBody: {
        fontSize: 13,
        fontFamily: "Sen Regular",
        color: COLORS.black,
        textTransform: 'uppercase',
        marginVertical: 6
    }
})

export default PersonalProfile