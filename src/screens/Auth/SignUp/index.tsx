import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import SignUpForm from '../../../components/complex/Forms/SignUpForm';
import {
  SignUpValidationSchema,
  signUpValue,
} from '../../../shared/utils/validation';
import { setLogInUser } from '../../../redux/authSlice/userSlice';
import { RootStackParamList } from '../../../navigation/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetUserQuery } from '../../../redux/authSlice';
import { useRedux } from '../../../hooks/UseRedux';


type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MainApp'
>;

const SignUp = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const dispatch = useDispatch();
  const { data } = useGetUserQuery(); // Fetch user data
  const [signUpData, setSignUpData] = useState<any>([]);
  const { storeState } = useRedux();

  useEffect(() => {
    if (data) {
      setSignUpData(data);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(storeState);
  // }, [storeState]);

  const handleLogin = (values: any) => {
    signUpData?.map((item: any) => {
      if (item.values.email == values.email) {
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
    zIndex: 832,
  },
  ImageContainer: {
    flex: 1,
    position: 'relative',
    top: -50,
  },
});

export default SignUp;
