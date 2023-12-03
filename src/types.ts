import {
  FieldError,
  RegisterOptions,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { RefObject } from 'react';

export type CommonReactProps = {
  children: React.ReactNode;
};

export interface IForm {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  passwordRepeat: string;
  country: string;
  img: string;
  acceptTC: boolean;
}

export type AppFields = {
  name: string;
  age: number;
  email: string;
  gender: string;
  password: string;
  passwordRepeat: string;
  country: string;
  img?: FileList | undefined;
  acceptTC?: boolean | undefined;
};

export enum FormKeys {
  NAME = 'name',
  EMAIL = 'email',
  AGE = 'age',
  GENDER = 'gender',
  PASSWORD = 'password',
  PASSWORD_REPEAT = 'passwordRepeat',
  IMG = 'img',
  COUNTRY = 'country',
  ACCEPT_TC = 'acceptTC',
}

export interface ValidatingFormData {
  [key: string]: string | number | boolean | undefined | null | FileList;
}

export interface CommonFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
}

export interface ReackHookFieldProps extends CommonFieldProps {
  formKey: FormKeys;
  error?: FieldError | undefined;
  register: (
    name: FormKeys,
    options?: RegisterOptions<AppFields, FormKeys> | undefined
  ) => UseFormRegisterReturn<FormKeys>;
}

export interface UncontrolledFieldProps extends CommonFieldProps {
  error?: string;
  ref: RefObject<HTMLInputElement>;
}
