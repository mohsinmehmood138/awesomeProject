import React, { useState } from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { LogOutButton } from '../AppButton';
import { useRedux } from '../../../hooks/UseRedux';
import { useNavigation } from '@react-navigation/native';
import NotificationToggle from '../AppButton/toggleButton';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Types';
import { logOutUser } from '../../../redux/authSlice/userSlice';

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { user, dispatch } = useRedux();

  const profileName = user?.values?.name || 'Guest';
  const profileEmail = user?.values?.email || 'guest@example.com';
  const userId = user?.id;

  const navigation = useNavigation<AuthStackNavigationProp>();

  const logoutSession = (userId: string | undefined) => {
    dispatch(logOutUser());
    navigation.replace('SignIn');
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
        onPress={() => logoutSession(userId)}
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
    color: '#000',
  },
  userEmail: {
    fontSize: 14,
    color: 'gray',
  },
  logOutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default CustomDrawerContent;
