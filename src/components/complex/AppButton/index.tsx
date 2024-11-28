import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../../shared/theme/colors';
import {FONT_FAMILY} from '../../../shared/theme/fonts';

interface ButtonProps {
  title: string;
  onPress: (text: any) => void;
  disabled: boolean;
  style: object;
}

const Button: React.FC<ButtonProps> = ({title, onPress, disabled, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

interface LogOutButtonScript {
  title: string;
  onPress: () => void;
  style: object;
}

const LogOutButton: React.FC<LogOutButtonScript> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.logOutContainer}>
      <Text style={styles.logoutButtonTetx}>{title}</Text>
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
    fontFamily: FONT_FAMILY.LIGHT,
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoutButtonTetx: {
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

export {Button, LogOutButton};
