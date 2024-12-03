import React, { useEffect, useRef } from 'react';
import styles from './splashStyle';
import { useRedux } from '../../../hooks/UseRedux';
import { View, Image, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Types';

interface AuthSlice {
  user: {
    email: string;
    name: string;
    password: string;
  } | null;
}

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;

function SplashScreen() {
  const { user, userVisited } = useRedux();
  const navigation: any = useNavigation<AuthStackNavigationProp>();

  const userCheck: AuthSlice['user'] = user;

  const position = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    console.log(userVisited);
  }, [userVisited]);

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(position, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(position, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(position, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(animation, { iterations: 1 }).start();

    setTimeout(() => {
      if (!userVisited) {
        navigation.replace('AuthSlider');
      } else if (!userCheck) {
        navigation.replace('WelcomeScreen');
      } else {
        navigation.replace('MainApp');
      }
    }, 3000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.View style={{ transform: [{ translateY: position }] }}>
        <Image
          style={styles.splashImg}
          source={require('../../../assets/images/Splash/splash.png')}
        />
      </Animated.View>
    </View>
  );
}

export default SplashScreen;
