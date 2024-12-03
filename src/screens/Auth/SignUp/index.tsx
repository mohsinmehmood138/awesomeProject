import React from 'react';
import { Formik } from 'formik';
import { Alert, StyleSheet } from 'react-native';
import { View, Image } from 'react-native';
import { useRedux } from '../../../hooks/UseRedux.tsx';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Types';
import { setVisited } from '../../../redux/authSlice/userSlice.ts';
import SignUpForm from '../../../components/complex/Forms/SignUpForm.tsx';
import { useCreateUserMutation } from '../../../redux/authSlice/index.tsx';
import { SignUpSchema, SignUpValues } from '../../../shared/utils/validation';

interface AuthSlice {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;

const SignUp = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [createUser] = useCreateUserMutation();
  const { dispatch } = useRedux();

  const handleSignUp = (values: AuthSlice) => {
    createUser({ values });
    navigation.navigate('SignIn');

    dispatch(setVisited(true));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/Auth/userInfo.png')}
        style={styles.signUpImage}
      />
      <View style={{ flex: 1, marginTop: 40 }}>
        <Formik
          initialValues={SignUpValues}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUp}>
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
    height: '100%',
  },
  signUpImage: {
    width: 250,
    height: 200,
    objectFit: 'contain',
    alignSelf: 'center',
  },
});

export default SignUp;
