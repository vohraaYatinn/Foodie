import { View, Text, TouchableOpacity, Image, LayoutAnimation, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../constants'
import { commonStyles } from '../styles/CommonStyles'
import { ScrollView } from 'react-native-virtualized-view'
import Button from '../components/Button'
import { FaqsData } from '../data/faqs'
import { useTranslation } from 'react-i18next'

const Faqs = ({ navigation }) => {

  const { t } = useTranslation();
 const FaqsData = [
  { question: t('faqs.q1.question'), answer: t('faqs.q1.answer') },
  { question: t('faqs.q2.question'), answer: t('faqs.q2.answer') },
  { question: t('faqs.q3.question'), answer: t('faqs.q3.answer') },
  { question: t('faqs.q4.question'), answer: t('faqs.q4.answer') },
  { question: t('faqs.q5.question'), answer: t('faqs.q5.answer') },
  { question: t('faqs.q6.question'), answer: t('faqs.q6.answer') }
];
    /**
     * Render FAQS header
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
                <Text style={{ marginLeft: 12, fontSize: 17, fontFamily: "Sen Regular" }}>FAQS</Text>
            </View>
        )
    }

    /***
     * Render common question asked
     */

    function renderFAQS(){
        const [expanded, setExpanded] = useState(-1);
      
        const toggleExpand = (index) => {
          if (expanded === index) {
            setExpanded(-1);
          } else {
            setExpanded(index);
          }
        };

        
        return (
            <View style={styles.container}>
            {FaqsData.map((faq, index) => (
                <View key={index} style={styles.faqContainer}>
                <TouchableOpacity onPress={() => toggleExpand(index)} activeOpacity={0.8}>
                    <View style={styles.questionContainer}>
                    <Text style={styles.question}>{faq.question}</Text>
                    <Text style={styles.icon}>{expanded === index ? '-' : '+'}</Text>
                    </View>
                </TouchableOpacity>
                {expanded === index && <Text style={styles.answer}>{faq.answer}</Text>}
                </View>
            ))}
            </View>
        )
    }

    /**Render Button to ask question */

    function renderActionButtons (){
        return (
            <Button
              title="ASK QUESTION"
              onPress={()=>navigation.navigate("SubmitQuestion")}
              filled
              style={{
                width: SIZES.width - 32,
                backgroundColor: COLORS.primary,
                borderColor: COLORS.primary,
                marginVertical: 12
              }}
            />
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            <View style={{
                flex: 1,
                marginHorizontal: 16
            }}>
                {renderHeader()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderFAQS()}
                    {renderActionButtons()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 16,
        paddingTop: 20,
      },
      faqContainer: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
        
      },
      questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 6,
      },
      question: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins Medium",
        color: '#333',
      },
      icon: {
        fontSize: 18,
        color: '#666',
      },
      answer: {
        fontSize: 14,
        marginTop: 10,
        paddingHorizontal: 16,
        paddingBottom: 10,
        fontFamily: "Sen Regular",
        color: '#666',
      },
  });

export default Faqs