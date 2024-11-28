import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CustomInput from '../../primitive/AppInput/index.tsx';
import { Button } from '../AppButton/index.tsx';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk-next';

import { useNavigation } from '@react-navigation/native';
import {
  GoogleIcon,
  FacebookIcon,
  TwitterIcon,
  WindowsIcon,
} from '../../../assets/icons/icons.jsx';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Types/index.js';
import { FormikErrors, FormikTouched } from 'formik';

interface SignUpFormProps {
  handleSubmit: (field: any) => any;
  isSubmitting: boolean;
  errors: FormikErrors<{ email: string; password: string }>;
  touched: FormikTouched<{ email: string; password: string }>;
  values: { email: string; password: string };
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T,
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
}

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserInfo'
>;

const SignUpForm: React.FC<SignUpFormProps> = ({
  handleSubmit,
  isSubmitting,
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
}) => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const handleLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      console.log("facebook resp>>", result);

      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        Alert.alert('error')
        // Fetch access token
        const data = await AccessToken.getCurrentAccessToken();
        console.log(data.accessToken.toString());
        // You can now send this token to your backend or use it directly for user data
      }
    } catch (error) {
      console.log('Login fail with error: ' + error);
    }
  };

  // async function onFacebookButtonPress() {

  //   try {

  //     const result = await LoginManager.logInWithPermissions([

  //       'email',
  //     ]);

  //     // if (result.isCancelled) {
  //     //   Alert.alert('Login Cancelled', 'The login process was cancelled.');
  //     //   return;
  //     // }

  //     // const data = await AccessToken.getCurrentAccessToken();
  //     // if (!data) {
  //     //   Alert.alert('Login Failed', 'Failed to retrieve access token.');
  //     //   return;
  //     // }

  //     // console.log('Access token:', data.accessToken);

  //     // Alert.alert('Login Successful', `Token: ${data.accessToken}`);
  //   } catch (error) {
  //     console.error('Facebook Login Error:', error);

  //   }
  // }

  const OrDivider = () => (
    <View style={styles.orContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.orText}>OR</Text>/
      <View style={styles.dividerLine} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <CustomInput
            onChangeText={(text: string) => handleChange('email')(text)}
            onBlur={() => handleBlur('email')}
            value={values.email}
            placeholder="Email"
            errors={errors.email}
            containerStyle={styles.input}
            keyboardType="default"
            editable={true}
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <CustomInput
            onChangeText={(text: string) => handleChange('password')(text)}
            onBlur={() => handleBlur('password')}
            value={values.password}
            placeholder="Password"
            keyboardType="numeric"
            containerStyle={styles.input}
            secureTextEntry
            editable={true}
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            { backgroundColor: '#ffffff' },
            styles.forgotPasswordContainer,
          ]}>
          <Text
            style={[{ backgroundColor: '#ffffff' }, styles.forgotPasswordText]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button
            title="Log In"
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={styles.loginButton}
          />
        </View>

        <OrDivider />

        <View style={styles.socialContainer}>
          <Text style={styles.socialText}>Sign in with</Text>
          <View style={styles.socialIconContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <GoogleIcon onPress={() => console.log('dkjadk')} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.socialButton}> */}
            <FacebookIcon onPress={handleLogin} />
            {/* </TouchableOpacity> */}
            <TouchableOpacity style={styles.socialButton}>
              <TwitterIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <WindowsIcon />
            </TouchableOpacity>
          </View>
        </View>
        {/* <LoginButton /> */}
        {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}
        <TouchableOpacity
          style={styles.createAccountContainer}
          onPress={() => navigation.navigate('UserInfo')}>
          <Text style={styles.createAccountText}>
            Don't have an account?{' '}
            <Text style={styles.createAccountLink}>Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 28,
    // fontFamily: FONT_FAMILY.BLACK,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    // fontFamily: FONT_FAMILY.REGULAR,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,

    marginBottom: 12,
    // fontFamily: FONT_FAMILY.REGULAR,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
    backgroundColor: 'white',
  },
  forgotPasswordText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  loginButton: {
    borderRadius: 12,
    height: 50,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  orText: {
    paddingHorizontal: 16,
    color: '#666',
    fontSize: 14,
    // fontFamily: FONT_FAMILY.MEDIUM,
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    // fontFamily: FONT_FAMILY.REGULAR,
  },
  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  createAccountContainer: {
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 14,
    color: '#666',
    // fontFamily: FONT_FAMILY.REGULAR,
  },
  createAccountLink: {
    color: '#FF3B30',
  },
});

export default SignUpForm;
