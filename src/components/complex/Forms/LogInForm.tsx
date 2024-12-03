import React from 'react';
import {
  GoogleIcon,
  FacebookIcon,
  TwitterIcon,
  WindowsIcon,
} from '../../../assets/icons/icons.jsx';
import { Button } from '../AppButton/index.tsx';
import { FormikErrors, FormikTouched } from 'formik';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../primitive/AppInput/index.tsx';
import { StackNavigationProp } from '@react-navigation/stack';
import { FONT_FAMILY } from '../../../shared/theme/fonts.tsx';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { RootStackParamList } from '../../../navigation/Types/index.js';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface SignInFormProps {
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
  'SignUp'
>;

// Main Component
const SignInForm: React.FC<SignInFormProps> = ({
  handleSubmit,
  isSubmitting,
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
}) => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  // Facebook Login Handler
  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (!result.isCancelled) {
        const data = await AccessToken.getCurrentAccessToken();
        if (data) {
          Alert.alert(
            'Login Success',
            `AccessToken: ${data.accessToken.toString()}`,
          );
        }
      } else {
        Alert.alert('Login cancelled');
      }
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      if (idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(googleCredential);
        Alert.alert('Login Success', 'Google sign-in completed.');
      }
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  // Divider Component
  const Divider = () => (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>OR</Text>
      <View style={styles.dividerLine} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        {/* Email Input */}
        <CustomInput
          onChangeText={(text: string) => handleChange('email')(text)}
          onBlur={() => handleBlur('email')}
          value={values.email}
          placeholder="Email"
          errors={errors.email}
          containerStyle={styles.input}
          keyboardType="default"
        />
        {errors.email && touched.email && (
          <Text style={styles.errorText}>{errors.email}</Text>
        )}

        {/* Password Input */}
        <CustomInput
          onChangeText={(text: string) => handleChange('password')(text)}
          onBlur={() => handleBlur('password')}
          value={values.password}
          placeholder="Password"
          containerStyle={styles.input}
          keyboardType="numeric"
          secureTextEntry
        />
        {errors.password && touched.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <Button
          title="Log In"
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={styles.loginButton}
        />

        {/* Divider */}
        <Divider />

        {/* Social Login */}
        <View style={styles.socialLoginContainer}>
          <Text style={styles.socialLoginText}>Sign in with</Text>
          <View style={styles.socialIcons}>
            <GoogleIcon onPress={onGoogleButtonPress} />
            <FacebookIcon onPress={handleFacebookLogin} />
            <TwitterIcon />
            <WindowsIcon />
          </View>
        </View>

        {/* Create Account */}
        <View style={{flex:1,alignSelf:"center",justifyContent:"center" }}>
          <Text style={styles.createAccountText}> Don't have an account </Text>
          <TouchableOpacity
            style={styles.createAccount}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.createAccountLink}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formWrapper: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginBottom: 12,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  forgotPassword: {
   alignSelf:"flex-end",
    marginBottom: 24,
    marginTop:15
  

  },
  forgotPasswordText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 12,
    height: 50,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#666',
    fontSize: 14,
    fontFamily: FONT_FAMILY.MEDIUM,
  },
  socialLoginContainer: {
    alignItems: 'center',
  },
  socialLoginText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  createAccount: {
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 14,
    color: '#666',
    fontFamily: FONT_FAMILY.REGULAR,
  },
  createAccountLink: {
    color: '#FF3B30',
  },
});

export default SignInForm;
