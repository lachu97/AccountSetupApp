import * as yup from 'yup';

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export const registrationSchema = yup.object({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email required'),
  password: yup.string().matches(passwordRules, 'Minimum 8 characters, letters and numbers').required('Password required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password required'),
  phone: yup.string().nullable().matches(/^[0-9()+\-\s]{7,20}$/, 'Invalid phone').notRequired(),
  country: yup.string().required('Country required')
});
