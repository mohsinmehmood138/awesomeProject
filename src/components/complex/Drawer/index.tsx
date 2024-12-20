import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useRedux} from '../../../hooks/UseRedux';
import {LogOutButton} from '../AppButton';
import {removeUser} from '../../../redux/authSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import NotificationToggle from '../AppButton/toggleButton';
import {RootStackParamList} from '../../../navigation/Types';

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const {storeState, dispatch} = useRedux();
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const profileName = storeState?.authSlice?.user?.name;
  const profileEmail = storeState?.authSlice?.user?.email;
  const navigation = useNavigation<AuthStackNavigationProp>();

  const logoutSession = () => {
    dispatch(removeUser({}));
    navigation.replace('SignUp');
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../../assets/images/profile/profile.png')}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{profileName}</Text>
          <Text style={styles.userEmail}>{profileEmail}</Text>
        </View>
        <DrawerItemList {...props} />
        <NotificationToggle />
      </DrawerContentScrollView>
      <LogOutButton
        title="Log Out"
        style={styles.logOutButton}
        onPress={logoutSession}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
  logOutButton: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
});

export default CustomDrawerContent;
