import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

interface InputProps {
  value?: string;
  onChangeText: (text:any) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  name?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad' | 'url' | 'visible-password';
  errors?: string;
  onBlur?: (field: string) => void;
  containerStyle?: object;
  editable: boolean;
}

const CustomInput: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  name,
  keyboardType,
  editable,
  errors,
  onBlur,
  containerStyle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {placeholder} <Text style={styles.asterisk}>*</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
       
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#aaa"
          keyboardType={keyboardType}
          editable={editable}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },

  inputContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 14,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  asterisk: {
    color: 'red',
  },
});

export default CustomInput;
