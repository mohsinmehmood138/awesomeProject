import React from 'react';
import CustomDrawer from './DrawerStack';
import SignIn from '../../screens/Auth/SignIn';
import SignUp from '../../screens/Auth/SignUp';
import SplashScreen from '../../screens/Auth/Splash';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthSlider from '../../components/complex/Slider/slider';
import WelcomeScreen from '../../components/complex/Slider/welcomeScreen';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainApp" component={CustomDrawer} />
        <Stack.Screen name="AuthSlider" component={AuthSlider} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
