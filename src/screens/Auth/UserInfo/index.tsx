import React from 'react';
import {View, Image} from 'react-native';
import Header from '../../../components/complex/AppHeader';
import {StyleSheet} from 'react-native';
import {Formik} from 'formik';
import {UserInfoSchema, userInfo} from '../../../shared/utils/validation';
import {useNavigation} from '@react-navigation/native';
import UserInfoForm from '../../../components/complex/Forms/UserInfoForm';
import {createUser} from '../../../redux/authSlice';
import {useRedux} from '../../../hooks/UseRedux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/Types';

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
  const {storeState, dispatch} = useRedux();

  const handleLogin = (values: AuthSlice) => {
    dispatch(createUser(values));
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
      <View style={{flex: 1}}>
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
