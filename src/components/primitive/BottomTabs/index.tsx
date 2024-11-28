import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../../navigation/BottomTabs/homeTab';
import ProfileScreen from '../../../navigation/BottomTabs/profileTab';
import SettingScreen from '../../../navigation/BottomTabs/settingTab';
import SearchScreen from '../../../navigation/BottomTabs/searchTab';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import UploadImages from '../../../navigation/BottomTabs/walletTab';
import {boolean} from 'yup';

const Tab = createBottomTabNavigator();
let iconName: string;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}): any => ({
        tabBarStyle: {
          width: '90%',
          position: 'fixed',
          alignSelf: 'center',
          bottom: 15,
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          paddingBottom: 10,
          backgroundColor: 'white',
        },

        headerShown: false,

        tabBarIcon: ({focused}: {focused: boolean}) => {
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
            case 'add':
              iconName = focused ? 'add' : 'add-circle-outline';
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
                style={{position: 'absolute', zIndex: 1, alignSelf: 'center'}}
              />
              ;
            </View>
          );
        },

        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="add" component={UploadImages} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}
