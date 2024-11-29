import React from 'react';
import { View, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { UserInfoSchema, userInfo } from '../../../shared/utils/validation';
import { useNavigation } from '@react-navigation/native';
import UserInfoForm from '../../../components/complex/Forms/UserInfoForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/Types';
import {
  useFetchDataQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserNameMutation,
} from '../../../redux/authSlice/index.tsx';

interface AuthSlice {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

type AuthStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

const UserInfo = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();

  const handleLogin = (values: AuthSlice) => {
    createUser({ values });
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/Auth/userInfo.png')}
        style={{
          width: 250,
          height: 250,
          objectFit: 'contain',
          alignSelf: 'center',
        }}
      />
      <View style={{ flex: 1 }}>
        <Formik
          initialValues={userInfo}
          validationSchema={UserInfoSchema}
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
            <UserInfoForm
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
});

export default UserInfo;
