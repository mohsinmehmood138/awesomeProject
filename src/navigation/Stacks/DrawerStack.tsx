import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerSettingTab from '../DrawerTabs/drawerSettingTab';
import DrawerDataTab from '../DrawerTabs/drawerDataTab';
import TabNavigator from '../../components/primitive/BottomTabs';
import Icons from 'react-native-vector-icons/Entypo';
import SettingIcons from 'react-native-vector-icons/Ionicons';
import Person from 'react-native-vector-icons/Fontisto';
import CustomDrawerContent from '../../components/complex/Drawer';
import colors from '../../shared/theme/colors';

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
          drawerIcon: ({color, size}) => (
            <Icons name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={TabNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, size}) => (
            <Person name="person" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={DrawerSettingTab}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color, size}) => (
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
