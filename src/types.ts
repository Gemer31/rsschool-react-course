import { FieldError, RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

export type CommonReactProps = {
    children: React.ReactNode,
}

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

export enum RegisterKeys {
    name = 'name',
    email = 'email',
    age = 'age',
    gender = 'gender',
    password = 'password',
    passwordRepeat = 'passwordRepeat',
    img = 'img',
    country = 'country',
    acceptTC = 'acceptTC',
}

export interface RHKInputProps {
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder: string;
    inputKey: RegisterKeys;
    error?: FieldError | undefined;
    register: (
        name: RegisterKeys,
        options?: RegisterOptions<AppFields, RegisterKeys> | undefined,
    ) => UseFormRegisterReturn<RegisterKeys>;
}
