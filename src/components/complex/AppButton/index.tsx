import React from 'react';
import colors from '../../../shared/theme/colors';
import { FONT_FAMILY } from '../../../shared/theme/fonts';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: (text: any) => void;
  disabled?: boolean;
  style?: object;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, style]}
      >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

interface LogOutButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

const LogOutButton: React.FC<LogOutButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.logOutContainer, style]}>
      <Text style={styles.logoutButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logOutContainer: {
    width: '80%',
    backgroundColor: 'black',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: FONT_FAMILY.MEDIUM,
  },
  buttonText: {
    fontFamily: FONT_FAMILY.BLACK,
    color: 'white',
    fontSize: 20,
  },
});

export { Button, LogOutButton };
