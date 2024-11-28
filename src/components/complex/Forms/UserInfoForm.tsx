import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomInput from '../../primitive/AppInput';
import {Button} from '../AppButton/index';

interface FormHandlerProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  errors: Record<string, string | undefined>;
  touched: Record<string, boolean>;
  values: Record<string, any>;
  handleChange: (field: string) => (text: string) => void;
  handleBlur: (field: string) => (text: string) => void;
}

const UserInfoForm: React.FC<FormHandlerProps> = ({
  handleSubmit,
  isSubmitting,
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <CustomInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
            errors={errors.email}
            keyboardType="default"
            editable={true}
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <CustomInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Enter Name"
            keyboardType="default"
            editable={true}
          />
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}

          <CustomInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Enter Password"
            keyboardType="numeric"
            editable={true}
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <CustomInput
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            placeholder="Enter Password"
            keyboardType="numeric"
            editable={true}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Add User"
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={styles.loginButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    top: -50,
  },
  scrollContentContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
    paddingTop: 0,
  },

  loginButton: {
    borderRadius: 12,
    height: 50,
  },
  formContainer: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});

export default UserInfoForm;
