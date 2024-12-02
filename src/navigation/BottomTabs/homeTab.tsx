import React from 'react';
import { RootStackParamList } from '../Types';
import AppCard from '../../components/complex/AppCard';
import Header from '../../components/complex/AppHeader';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

export default function HomeScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();

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
