import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import colors from '../../../shared/theme/colors';
import { useRedux } from '../../../hooks/UseRedux';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Types';
import { setVisited } from '../../../redux/authSlice/userSlice';

type Slide = {
  key: number;
  title: string;
  text: string;
  image: string;
  firstColor: string;
  secondColor: string;
};

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WelcomeScreen'
>;

const { width, height } = Dimensions.get('window');

const slides: Slide[] = [
  {
    key: 1,
    title: 'My Visit',
    text: 'Write details about feature A here. Write details about feature A here. Write details about feature A here.',
    image:
      'https://ideogram.ai/assets/image/lossless/response/tHDB7F13TwGh97Jc1XKclg',
    firstColor: 'rgba(178, 219, 191, 1)',
    secondColor: 'rgba(178, 219, 191, .8)',
  },
  {
    key: 2,
    title: 'Scan QR',
    text: 'Write details about feature B here. Write details about feature B here. Write details about feature B here.',
    image:
      'https://ideogram.ai/assets/progressive-image/balanced/response/N1_W3hAWTrSVWAJsRpoQ0g',
    firstColor: 'rgba(112, 193, 179, 1)',
    secondColor: 'rgba(112, 193, 179, 0.8)',
  },
  {
    key: 3,
    title: 'Happy Customer',
    text: 'Write details about feature C here. Write details about feature C here. Write details about feature C here.',
    image:
      'https://ideogram.ai/assets/progressive-image/balanced/response/pn_928mJRtminob4_ja3pg',
    firstColor: 'rgba(178, 219, 191, 1)',
    secondColor: 'rgba(178, 219, 191, .8)',
  },
];

const AuthSlider: React.FC = () => {
  const navigation: any = useNavigation<AuthStackNavigationProp>();
  const { dispatch } = useRedux();

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={[styles.slide]}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.overlay}>
        <LinearGradient
          colors={[item.firstColor, item.secondColor, 'rgba(112, 193, 179, 0)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0, 0.7, 1]}
          style={styles.gradient}
        />
      </View>
      <View style={styles.textContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  );

  const onDone = () => {
    navigation.replace('WelcomeScreen');
    dispatch(setVisited(true));
  };

  const onSkip = () => {
    navigation.replace('WelcomeScreen');
    dispatch(setVisited(true));
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
      onSkip={onSkip}
      dotStyle={styles.dot}
      showSkipButton={true}
      activeDotStyle={styles.activeDot}
      renderNextButton={() => (
        <View style={styles.nextButtonIcon}>
          <Icon name="arrow-forward" size={30} color="white" />
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.nextButtonIcon}>
          <Icon name="arrow-forward" size={30} color="white" />
        </View>
      )}
      renderSkipButton={() => <Text style={styles.skipButton}>Skip</Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width,
    height: '100%',
    position: 'absolute',
    top: 0,
  },
  textContent: {
    marginTop: height * 0.5,
    width: '90%',
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
  },
  nextButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#22bcb5',
    padding: 10,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  nextButtonIcon: {
    backgroundColor: colors.backgroundColor,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    width: 45,
    height: 45,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.backgroundColor,
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 20,
    paddingHorizontal: 14,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  activeDot: {
    backgroundColor: colors.backgroundColor,
  },
  dot: {
    backgroundColor: 'white',
  },

  overlay: {
    width,
    height: height * 0.7,
    position: 'absolute',
    bottom: 0,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default AuthSlider;
