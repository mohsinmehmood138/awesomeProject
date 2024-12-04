import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../../../navigation/BottomTabs/homeTab';
import SocialUpload from '../../../navigation/BottomTabs/socialUpload';
import SearchScreen from '../../../navigation/BottomTabs/searchTab';
import SettingScreen from '../../../navigation/BottomTabs/settingTab';
import ProfileScreen from '../../../navigation/BottomTabs/profileTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
let iconName: string;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }): any => ({
        tabBarStyle: {
          width: '90%',
          position: 'fixed',
          alignSelf: 'center',
          bottom: 15,
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          paddingBottom: 10,
          backgroundColor: 'white',
        },

        headerShown: false,

        tabBarIcon: ({ focused }: { focused: boolean }) => {
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'camera':
              iconName = focused ? 'camera' : 'camera-outline';
              break;
          }

          return (
            <View
              style={{
                backgroundColor: focused ? '#FF1654' : 'transparent',
                borderRadius: 50,
                padding: 20,
                marginTop: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                name={iconName}
                size={24}
                color={focused ? 'white' : 'black'}
                style={{ position: 'absolute', zIndex: 1, alignSelf: 'center' }}
              />
              ;
            </View>
          );
        },

        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="camera" component={SocialUpload} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}
