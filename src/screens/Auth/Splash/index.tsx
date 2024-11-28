import React, {useEffect, useRef} from 'react';
import {View, Image, StyleSheet, Animated, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRedux} from '../../../hooks/UseRedux';
import styles from './splashStyle';
import {RootStackParamList} from '../../../navigation/Types';
import {StackNavigationProp} from '@react-navigation/stack';

interface AuthSlice {
  user: {
    email: string;
    name: string;
    password: string;
  } | null;
  isAuthenticated: boolean;
  isAlertOpen: boolean;
}

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SplashScreen'
>;

function SplashScreen() {
  const {storeState, dispatch} = useRedux();
  const navigation:any = useNavigation<AuthStackNavigationProp>();

  const userCheck: AuthSlice['user'] = storeState?.authSlice?.user;
  const position = useRef(new Animated.Value(-100)).current;

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

    Animated.loop(animation, {iterations: 1}).start();

    setTimeout(() => {
      if (!userCheck) {
        navigation.replace('SignUp');
      } else {
        navigation.replace('MainApp' );
      }
    }, 3000);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.View style={{transform: [{translateY: position}]}}>
        <Image
          style={styles.splashImg}
          source={require('../../../assets/images/Splash/splash.png')}
        />
      </Animated.View>
    </View>
  );
}

export default SplashScreen;
