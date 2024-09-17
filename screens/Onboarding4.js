import { View, Text, Image, StatusBar, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES, images } from '../constants';
import PageContainer from '../components/PageContainer';
import DotsView from '../components/DotsView';
import Button from '../components/Button';

const Onboarding4 = ({ navigation }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 1) {
          clearInterval(intervalId);
          return prevProgress;
        }

        return prevProgress + 0.4;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      // navigate to the Login Screen
      navigation.navigate('Login');
    }
  }, [progress, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <PageContainer style={styles.pageContainer}>
        <View style={styles.pageContainer}>
          <Image source={images.onboarding4} resizeMode="contain" style={styles.image} />

          <View style={styles.titleContainer}>
            <Text style={styles.title1}>Free delivery offers</Text>
            <Text style={styles.title2}>FEELESS</Text>
          </View>

          <Text style={styles.bodyText}>
            Order from your chosen chef with no delivery fee. You just place the order, we do the rest.
          </Text>

          <View style={styles.dotsContainer}>
            {progress < 1 && <DotsView progress={progress} numDots={4} />}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Next"
              filled
              onPress={() => navigation.navigate('Login')}
              style={styles.nextButton}
            />
            <Button
              title="Skip"
              onPress={() => navigation.navigate('Login')}
              style={styles.skipButton}
            />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 22,
  },
  image: {
    height: SIZES.width * 0.8,
    width: SIZES.width * 0.8,
  },
  titleContainer: {
    marginVertical: 18,
    alignItems: 'center',
  },
  title1: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  title2: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  bodyText: {
    ...FONTS.body3,
    color: COLORS.black,
    textAlign: 'center',
  },
  dotsContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 22,
  },
  nextButton: {
    width: SIZES.width - 44,
    marginBottom: SIZES.padding,
  },
  skipButton: {
    width: SIZES.width - 44,
    marginBottom: SIZES.padding,
    backgroundColor: 'transparent',
    borderColor: COLORS.primary,
  },
});

export default Onboarding4;
