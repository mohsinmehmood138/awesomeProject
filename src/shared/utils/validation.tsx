import * as Yup from 'yup';

const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameFormat = /^[A-Za-z][A-Za-z0-9]*$/;

interface SignInscript {
  email: string;
  password: string;
}

const signInValue: SignInscript = {
  email: '',
  password: '',
};

interface SignUpScript {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const SignUpValues: SignUpScript = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
};

const SignInValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(emailFormat, 'Email format is invalid')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
});

const SignUpSchema = Yup.object({
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

export { SignInValidationSchema, SignUpSchema, signInValue, SignUpValues };
