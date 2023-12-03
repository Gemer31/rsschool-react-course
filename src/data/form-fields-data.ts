import { FormKeys, ReackHookFieldProps } from '../types';

export const FormFieldsData: Record<
  string,
  Omit<ReackHookFieldProps, 'register'>
> = {
  name: {
    id: FormKeys.NAME,
    name: FormKeys.NAME,
    formKey: FormKeys.NAME,
    type: 'text',
    label: 'Name',
    placeholder: 'Enter the name',
  },
  age: {
    id: FormKeys.AGE,
    name: FormKeys.AGE,
    formKey: FormKeys.AGE,
    type: 'number',
    label: 'Age',
    placeholder: 'Enter the age',
  },
  email: {
    id: FormKeys.EMAIL,
    name: FormKeys.EMAIL,
    formKey: FormKeys.EMAIL,
    type: 'text',
    label: 'Email',
    placeholder: 'Enter the email',
  },
  password: {
    id: FormKeys.PASSWORD,
    name: FormKeys.PASSWORD,
    formKey: FormKeys.PASSWORD,
    type: 'password',
    label: 'Password',
    placeholder: 'Create a password',
  },
  passwordRepeat: {
    id: FormKeys.PASSWORD_REPEAT,
    name: FormKeys.PASSWORD_REPEAT,
    formKey: FormKeys.PASSWORD_REPEAT,
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Enter your password again',
  },
  img: {
    id: FormKeys.IMG,
    name: FormKeys.IMG,
    formKey: FormKeys.IMG,
    type: 'file',
    label: 'Upload image',
    placeholder: '',
  },
  gender: {
    id: FormKeys.GENDER,
    name: FormKeys.GENDER,
    formKey: FormKeys.GENDER,
    type: 'select',
    label: 'Gender',
    placeholder: 'Select the gender',
  },
  countries: {
    id: FormKeys.COUNTRY,
    name: FormKeys.COUNTRY,
    formKey: FormKeys.COUNTRY,
    type: 'select',
    label: 'Country',
    placeholder: 'Select the country',
  },
  acceptTC: {
    id: FormKeys.ACCEPT_TC,
    name: FormKeys.ACCEPT_TC,
    formKey: FormKeys.ACCEPT_TC,
    type: 'checkbox',
    label: 'Accept T&C',
    placeholder: '',
  },
};
