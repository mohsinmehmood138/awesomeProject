import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../../screens/Auth/SignUp';
import UserInfo from '../../screens/Auth/UserInfo';
import SplashScreen from '../../screens/Auth/Splash';
import CustomDrawer from './DrawerStack';


const Stack = createStackNavigator()
const AuthStack = () => {




  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="MainApp" component={CustomDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
