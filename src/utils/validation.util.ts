import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .max(150)
    .integer('Age must be an integer'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])/,
      'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character'
    )
    .required('Password is required'),
  passwordRepeat: yup
    .string()
    .required('Field "Confirm Password" is required')
    .oneOf([yup.ref('password')], 'Passwords must match!'),
  gender: yup.string().required('Gender is required'),
  acceptTC: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions'),
  img: yup
    .mixed<FileList>()
    .test(
      'fileSize',
      'The image size should not be more than 5MB',
      (files) => !files?.[0] || files[0].size <= 5242880 // 5 MB in bytes
    )
    .test(
      'fileType',
      'Unsupported file type',
      (files) =>
        !!files?.length && ['image/png', 'image/jpeg'].includes(files[0].type)
    )
    .required('Image is required'),
  country: yup.string().required(),
});
