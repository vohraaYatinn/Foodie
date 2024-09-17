import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, illustrations, images } from '../constants'
import Ionicons from "react-native-vector-icons/Ionicons"
import Geolocation from '@react-native-community/geolocation';

const LocationAccess = ({ navigation }) => {
    const arrayGPS = [];
    const [gps, setGps] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const getPermissions = async () => {
            Geolocation.setRNConfiguration({
                skipPermissionRequests: false,
                authorizationLevel: 'whenInUse',
            });
    
            Geolocation.requestAuthorization();
    
            Geolocation.getCurrentPosition(
                async (position) => {
                    const longitude = position.coords.longitude;
                    const latitude = position.coords.latitude;
                    arrayGPS.push(longitude, latitude);
    
                    try {
                        const address = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
                        );
    
                        const addressData = await address.json();
                        setAddress(
                            `${addressData.results[0].formatted_address}`
                        );
                        setGps(arrayGPS);
                    } catch (error) {
                        console.log('Error fetching address:', error);
                    }
                },
                (error) => {
                    console.log('Error getting location:', error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };
    
        getPermissions();
    }, [gps]);
  

    return (
        <SafeAreaView style={styles.area}>
            <StatusBar hidden={true} />
            <View style={styles.center}>
                <Image
                    source={illustrations.location}
                    resizeMode='contain'
                    style={styles.locationImage} />
                <TouchableOpacity
                    onPress={() => navigation.navigate("Main")}
                    style={styles.btn}>
                    <Text style={styles.btnText}>Access Location</Text>
                    <View style={styles.iconContainer}>
                        <Ionicons name="location-outline" size={20} color={COLORS.white} />
                    </View>
                </TouchableOpacity>
                <Text style={styles.bottomText}>FOODIE WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 22
    },
    btn: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding2,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: SIZES.padding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.width - 44,
        marginTop: SIZES.padding2 * 4,
        marginBottom: SIZES.padding2 * 2,
        backgroundColor: COLORS.primary
    },
    locationImage: {
        height: SIZES.width * 0.8,
        width: SIZES.width * 0.8
    },
    btnText: {
        ...FONTS.body3,
        textTransform: 'uppercase',
        color: COLORS.white
    },
    iconContainer: {
        marginLeft: SIZES.padding3,
        height: 32,
        width: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    bottomText: {
        ...FONTS.body4,
        textTransform: 'uppercase',
        marginVertical: SIZES.padding * 2,
        textAlign: 'center'
    }
})
export default LocationAccess