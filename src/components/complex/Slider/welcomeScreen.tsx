import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import colors from '../../../shared/theme/colors';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Types';

type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
};

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const { width, height } = Dimensions.get('window');

const Button: React.FC<ButtonProps> = ({ onPress, text }) => (
  <TouchableOpacity
    onPress={onPress}
    style={text === 'Sign Up' ? styles.signupButton : styles.loginButton}>
    <Text style={text === 'Sign Up' ? styles.signupText : styles.loginText}>
      {text}
    </Text>
  </TouchableOpacity>
);

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const handleSignupPress = () => {
    navigation.navigate('SignUp');
  };

  const handleLoginPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://ideogram.ai/assets/progressive-image/balanced/response/pn_928mJRtminob4_ja3pg',
      }}
      style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 0.8)',
            'rgba(112, 193, 179, 0)',
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          locations={[0, 0.7, 1]}
          style={styles.gradient}
        />
      </View>
      <View style={styles.welcomeScreenContent}>
        <Text style={styles.heading}>Welcome to Our App</Text>
        <Text style={styles.description}>Start your journey with us</Text>
      </View>
      <View style={styles.container}>
        <Button onPress={handleLoginPress} text="Log In" />
        <Button onPress={handleSignupPress} text="Sign Up" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    padding: 20,
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupButton: {
    backgroundColor: colors.backgroundColor,
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: 'transparent',
    paddingVertical: 11,
    paddingHorizontal: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 10,
  },

  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlay: {
    width,
    height: height * 0.4,
    position: 'absolute',
    bottom: 0,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeScreenContent: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
  },
  heading: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default WelcomeScreen;
