import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, StyleSheet } from 'react-native';

const BackIcon = ({ size = 30, color = 'black' }) => {
  const navigation = useNavigation();

  return (
    <Ionicons
      name="arrow-back"
      size={size}
      color={color}
      onPress={() => navigation.goBack()}
    />
  );
};

const SocialIcon = ({ iconName, backgroundColor, onPress, size = 30 }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor }]}
    onPress={onPress}>
    <Icon name={iconName} size={size} color="white" />
  </TouchableOpacity>
);

// Specific Social Icons
const GoogleIcon = ({ onPress }) => (
  <SocialIcon iconName="google" backgroundColor="#DB4437" onPress={onPress} />
);

const FacebookIcon = ({ onPress }) => (
  <SocialIcon iconName="facebook" backgroundColor="#3b5998" onPress={onPress} />
);

const TwitterIcon = () => (
  <SocialIcon iconName="twitter" backgroundColor="#1DA1F2" />
);

const WindowsIcon = () => (
  <SocialIcon iconName="windows" backgroundColor="#00A4EF" />
);

const WhatsAppIcon = ({ onPress }) => (
  <SocialIcon iconName="whatsapp" backgroundColor="green" onPress={onPress} />
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export {
  BackIcon,
  GoogleIcon,
  FacebookIcon,
  TwitterIcon,
  WindowsIcon,
  WhatsAppIcon,
};
