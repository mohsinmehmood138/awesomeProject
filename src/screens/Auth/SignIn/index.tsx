import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetUserQuery } from '../../../redux/authSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Types';
import { setLogInUser } from '../../../redux/authSlice/userSlice';
import SignInForm from '../../../components/complex/Forms/LogInForm';
import {
  SignInValidationSchema,
  signInValue,
} from '../../../shared/utils/validation';

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainApp'
>;

const SignIn = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const dispatch = useDispatch();
  const { data } = useGetUserQuery();
  const [signInData, setSignInData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setSignInData(data);
    }
  }, [data]);

  const handleLogin = (values: any) => {
    signInData.find((item: any) => {
      const email = item.values?.email;
      if (email === values.email) {
        dispatch(setLogInUser(item));
        navigation.navigate('MainApp');
      }
    });
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
          initialValues={signInValue}
          validationSchema={SignInValidationSchema}
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
            <SignInForm
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    width: 250,
    height: 200,
    zIndex: 832,
    alignSelf: 'center',
    objectFit: 'contain',
  },
  ImageContainer: {
    position: 'relative',
    flex: 1,
    top: -40,
  },
});

export default SignIn;
