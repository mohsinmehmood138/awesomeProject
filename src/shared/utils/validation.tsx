import * as Yup from 'yup';

const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameFormat = /^[A-Za-z][A-Za-z0-9]*$/;

interface SignUpscript{
  email: string,
  password: string,
}

const signUpValue:SignUpscript = {
  email: '',
  password: '',
};



interface InfoScript{
  email: string,
  name: string,
  password:string,
  confirmPassword:string 
}

const userInfo :InfoScript= {
  email: '',
  name: '',
  password: '',
  confirmPassword:'' 
};

const SignUpValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address') 
    .matches(emailFormat, 'Email format is invalid') 
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

const UserInfoSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address') 
    .matches(emailFormat, 'Email format is invalid') 
    .required('Required'),
  name: Yup.string().matches(nameFormat, 'Invalid Name').required('Required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});

export {SignUpValidationSchema, UserInfoSchema, signUpValue, userInfo};
