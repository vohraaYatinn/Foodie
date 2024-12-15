import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { commonStyles } from '../styles/CommonStyles'
import { Image } from 'react-native-animatable';
import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const CustomerCare = () => {
    const renderHeader = () => {
        const navigation = useNavigation()
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'start',
            }}>
                <View style={{ flexDirection: 'row' }}>
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
                </View>
  
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
              {renderHeader()}
            <View style={styles.content}>
                <Text style={styles.label}>Customer Care</Text>
                <Text style={styles.phoneNumber}>+351 920 040 920</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    content: {
        alignItems: 'center',
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    phoneLabel: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },
    phoneNumber: {
        fontSize: 20,
        fontWeight: '600',
        color: '#007BFF',
    },
});

export default CustomerCare;
