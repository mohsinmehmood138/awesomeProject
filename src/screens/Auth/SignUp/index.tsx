import React from 'react';
import {StyleSheet, Text} from 'react-native';
import SignUpForm from '../../../components/complex/Forms/SignUpForm';
import {showAlert} from '../../../redux/authSlice';
import {useRedux} from '../../../hooks/UseRedux';
import CustomAlert from '../../../components/primitive/AppAlert';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {Formik} from 'formik';
import {Image} from 'react-native';
import {
  SignUpValidationSchema,
  signUpValue,
} from '../../../shared/utils/validation';
import {RootStackParamList} from '../../../navigation/Types';
import {StackNavigationProp} from '@react-navigation/stack';
const ImageUrl = '../../../assets/images/alert/createAccount.png';

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainApp'
>;

const SignUp = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const {storeState, dispatch} = useRedux();

  const user = storeState?.authSlice?.user;

  interface AuthSlice {
    email: string;
    password: string;
  }

  const handleLogin = (values: AuthSlice) => {
    if (
      values.email == user?.email &&
      values.password == storeState?.authSlice?.user?.password
    ) {
      navigation.replace('MainApp', {
        email: values.email,
        password: values.password,
      });
    } else {
      dispatch(showAlert({}));
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/Auth/auth.png')}
        alt="image"
      />
      <View style={styles.ImageContainer}>
        <Formik
          initialValues={signUpValue}
          validationSchema={SignUpValidationSchema}
          onSubmit={handleLogin}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <SignUpForm
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
        </Formik>
      </View>

      <CustomAlert image={ImageUrl} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 250,
    height: 200,
    alignSelf: 'center',
    objectFit: 'contain',
    zIndex: 832,
  },

  ImageContainer: {
    flex: 1,
    position: 'relative',
    top: -50,
  },
});

export default SignUp;
