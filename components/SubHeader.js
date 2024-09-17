import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FONTS, COLORS } from '../constants'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

const SubHeader = ({ title, onPress }) => {
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
        alignItems: 'center',
      }}>
        <Text style={{ ...FONTS.body2 }}>{title}</Text>
        <TouchableOpacity
          onPress={onPress}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 16, fontFamily: "Sen Regular" }}>See All</Text>
          <View>
            <MaterialIcons name="keyboard-arrow-right" size={24} color={COLORS.gray4} />
          </View>
        </TouchableOpacity>
      </View>
  )
}

export default SubHeader