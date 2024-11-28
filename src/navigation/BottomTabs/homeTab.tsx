import React from 'react';
import { View, Text, Alert } from 'react-native';
import { useRedux } from '../../hooks/UseRedux';
import { removeUser } from '../../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import Header from '../../components/complex/AppHeader';
import AppCard from '../../components/complex/AppCard';
import { RootStackParamList } from '../Types';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

export default function HomeScreen() {
  const { storeState, dispatch } = useRedux();
  const userName = storeState?.authSlice?.user?.name;
  const navigation = useNavigation<AuthStackNavigationProp>();

  const LogOutUser = () => {
    dispatch(removeUser({}));
    navigation.navigate('SignUp');
  };

  const handleOpenDrawer = () => {

    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <>
      <Header
        title="For You"
        name="bars"
        onPress={handleOpenDrawer}
        backIcon=""
      />
      <AppCard />
    </>
  );
}
