import { View, Text, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import { commonStyles } from '../styles/CommonStyles'
import { COLORS, icons, images } from '../constants'
import FontAwesome from "react-native-vector-icons/FontAwesome"

const Message = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputText = (text) => {
        setInputMessage(text)
    }

    const submitHandler = () => {
        const message = {
            _id: Math.random().toString(36).substring(7),
            text: inputMessage,
            createdAt: new Date(),
            user: { _id: 1 },
        }
        setMessages((previousMessage) =>
            GiftedChat.append(previousMessage, [message])
        )
    }
    const renderMessage = (props) => {
        const { currentMessage } = props

        if (currentMessage.user._id === 1) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: COLORS.primary,
                                marginRight: 12,
                                marginVertical: 12,
                            },
                        }}
                        textStyle={{
                            right: {
                                color: COLORS.white, // Change the text color for the sender here
                            },
                        }}
                    />
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Image
                        source={images.avatar}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            marginLeft: 8,
                        }}
                    />
                    <Bubble
                        {...props}
                        wrapperStyle={{
                            left: {
                                backgroundColor: COLORS.primary,
                                marginLeft: 12,
                            },
                        }}
                        textStyle={{
                            left: {
                                color: COLORS.white, // Change the text color for the sender here
                            },
                        }}
                    />
                </View>
            )
        }

        return <Bubble {...props} />
    }

    const renderHeader = () => {
        const navigation = useNavigation();

        return (
            <View
                style={{
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
                        source={icons.close}
                        style={{ height: 24, width: 24, tintColor: COLORS.black }}
                    />
                </TouchableOpacity>
                <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular" }}>Linda Bi</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar hidden={true} />
            <View style={{ flex: 1, marginHorizontal: 16 }}>
                {renderHeader()}
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <GiftedChat
                        messages={messages}
                        renderInputToolbar={() => { }}
                        user={{ _id: 1 }}
                        minInputToolbarHeight={0}
                        renderMessage={renderMessage}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: COLORS.white,
                        paddingVertical: 8,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginLeft: 10,
                            backgroundColor: '#F2F2F2',
                            paddingVertical: 8,
                            marginHorizontal: 12,
                            borderRadius: 12,
                        }}
                    >
                        <TextInput
                            style={{
                                color: COLORS.black,
                                flex: 1,
                                paddingHorizontal: 10,
                            }}
                            value={inputMessage}
                            onChangeText={handleInputText}
                            placeholderTextColor={COLORS.gray5}
                            placeholder="Write somethings"
                        />

                        <TouchableOpacity onPress={submitHandler}>
                            <View
                                style={{
                                    padding: 6,
                                    borderRadius: 8,
                                    marginHorizontal: 12,
                                }}
                            >
                                <FontAwesome
                                    name="send-o"
                                    size={24}
                                    color={COLORS.primary}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Message