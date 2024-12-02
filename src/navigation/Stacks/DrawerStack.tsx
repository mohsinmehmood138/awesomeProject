import colors from '../../shared/theme/colors';
import Icons from 'react-native-vector-icons/Entypo';
import DrawerDataTab from '../DrawerTabs/drawerDataTab';
import Person from 'react-native-vector-icons/Fontisto';
import DrawerSettingTab from '../DrawerTabs/drawerSettingTab';
import SettingIcons from 'react-native-vector-icons/Ionicons';
import TabNavigator from '../../components/primitive/BottomTabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../../components/complex/Drawer';

const Drawer = createDrawerNavigator();

function CustomDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          width: 240,
          borderRadius: 0,
        },
        drawerActiveBackgroundColor: colors.backgroundColor,
        drawerActiveTintColor: 'white',
        drawerInactiveTintColor: 'black',
      }}>
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Icons name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={TabNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <Person name="person" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={DrawerSettingTab}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <SettingIcons name="settings" size={size} color={color} />
          ),
        }}
        name="Setting"
        component={DrawerDataTab}
      />
    </Drawer.Navigator>
  );
}

export default CustomDrawer;
