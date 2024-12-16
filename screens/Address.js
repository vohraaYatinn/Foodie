import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from "../constants"
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import Feather from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Button from '../components/Button'
import Toast from 'react-native-toast-message'; // Import Toast
import { defaultAddress, deleteAddress, getAddresses } from '../urls/urls'
import useAxios from '../network/useAxios'
import { useTranslation } from "react-i18next";

const Address = ({ navigation }) => {
        const { t } = useTranslation();
    
    const notify = (message, action) => {
        Toast.show({
            type: action,
            text1: action,
            text2: message
        });
    }
    const [data, setData] = useState([])
    const [responseLogin, responseError, responseLoading, responseFetch] = useAxios()
    const [deleteLogin, deleteError, deleteLoading, deleteFetch] = useAxios()
    const fetchDashboarfFunc = () => {
        responseFetch(getAddresses())
    }
    const deleteAddressFunc = (id) => {
        deleteFetch(deleteAddress({
            addressId:id
        }))
    }
    const changeAddressDefault = (id) => {
        deleteFetch(defaultAddress({
            addressId:id
        }))
    }
    useFocusEffect(
        useCallback(() => {
          // Code here runs every time the screen comes into focus
          fetchDashboarfFunc()
      
          // Cleanup (optional) runs when the screen loses focus
          return () => {
           
          };
        }, [])
      );


    useEffect(()=>{
        if(responseLogin?.result == "success"){
          setData(responseLogin?.data)
        }
      },[responseLogin])
    useEffect(()=>{
        if(deleteLogin?.result == "success"){
            notify(deleteLogin?.message, "success")
            fetchDashboarfFunc()
        }
      },[deleteLogin])
        const handlePressGotIt = () => {
          // Handle the logic when the "GOT IT" button is pressed
          // For example, you can close the modal or perform any other action
          setModalVisible(false);
        };
        useEffect(() => {
            if (responseError?.response) {
                notify(responseError?.response?.data, "error")
            }
          }, [responseError])
        useEffect(() => {
            if (deleteError?.response) {
                notify(deleteError?.response?.data, "error")
            }
          }, [deleteError])
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
                        onPress={() => navigation.navigate("Home")}
                        style={commonStyles.header1Icon}
                    >
                        <Image
                            resizeMode='contain'
                            source={icons.arrowLeft}
                            style={{ height: 24, width: 24, tintColor: COLORS.black }}
                        />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular" }}>Edit Profile</Text>
                </View>

            </View>
        )
    }

    const renderUserAddresses = () => {
        return (
            <View style={{ flexDirection: 'column', marginVertical: 22 }}>
                {data.map((item)=>{
                    return(
                        <TouchableOpacity onPress={()=>{changeAddressDefault(item.id)}}>
                        <View style={styles.container} >
                        <View
                         
                            style={styles.subContainer}
                        >
                            
                            <View style={styles.subLeftContainer}>
                                <View style={styles.rounded}>
                                    {item.name == "home" ? <Feather name="home" size={24} color="#2790C3" />:                                <MaterialIcons name="work-outline" size={24} color="#A03BB1" />}
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                    <Text style={styles.boldBody}>{item.name}{item.is_active ? " (Active)":""}</Text>
                                    <Text style={styles.textBody}>
                                        {item.street} &nbsp; {item.zip_code}
                                    </Text>
                                </View>
                            </View>
    
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 6,
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                {/* <TouchableOpacity>
                                    <Feather name="edit" size={18} color={COLORS.primary} />
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    style={{
                                        marginLeft: 4
                                    }}
                                    onPress={()=>{
                                        deleteAddressFunc(item.id)
                                    }}
                                >
                                    <MaterialCommunityIcons name="delete-outline" size={22} color={COLORS.primary} />
                                </TouchableOpacity>
                            </View>
    
                        </View>
                    </View>
                    </TouchableOpacity>

                    )
                })}
             
               
            </View>
        )
    }
    return (
        <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar hidden={true} />
        <View style={{
            flex: 1,
            marginHorizontal: 16,
            marginBottom: 100
        }}>
            {renderHeader()}
            {renderUserAddresses()}
            <Button
                filled
                title={t("edit_address.add_new_address")}
                onPress={() => navigation.navigate("AddNewAddress")}
                style={{
                    position: 'absolute',
                    bottom: 40,
                    width: SIZES.width - 32
                }}
            />
        </View>
        <Toast />
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

export default Address