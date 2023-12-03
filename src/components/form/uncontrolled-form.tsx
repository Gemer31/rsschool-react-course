import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { fileReader } from '../../utils/file-reader';
import { UncontrolledCheckbox } from '../checkbox/uncontrolled-checkbox';
import { UncontrolledInput } from '../input/uncontrolled-input';
import { UncontrolledSelect } from '../select/uncontrolled-select';
import { RouterPage } from "../../utils/router.tsx";
import { addNewForm } from "../../store/slice.ts";
import { FormFieldsData } from "../../data/form-fields-data.ts";
import { validationSchema } from "../../utils/validation.ts";
import { ValidationError } from "yup";
import { AppFields, IForm } from "../../types.ts";

interface ValidatingFormData {
    [key: string]: string | number | boolean | undefined | null | FileList;
}
export const UncontrolledForm = () => {
    const navigate = useNavigate();
    const {countries} = useAppSelector((state) => state.countries);
    const dispatch = useAppDispatch();

    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordRepeatRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLInputElement>(null);
    const acceptTCRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        let isValidated: boolean;
        let validatedData: AppFields;
        let errorMessages: Record<string, string>;
        const formData: ValidatingFormData = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            age: Number(ageRef.current?.value),
            gender: genderRef.current?.value,
            password: passwordRef.current?.value,
            passwordRepeat: passwordRepeatRef.current?.value,
            country: countryRef.current?.value,
            img: imgRef.current?.files,
            acceptTC: acceptTCRef.current?.checked,
        };

        try {
            const validatedForm = await validationSchema.validate(
                formData,
                { abortEarly: false },
            );

            isValidated = true;
            validatedData = validatedForm;
            errorMessages = {};
        } catch (error) {
            if (error instanceof ValidationError) {
                const yupErros: Record<string, string> = {};

                error.inner.forEach((err) => {
                    if (typeof err.path === 'string') {
                        yupErros[err.path] = err.message;
                    }
                });

                isValidated = false
                errorMessages = yupErros;

            }
            isValidated = false
            errorMessages = {};
        }


        if (isValidated && validatedData) {
            const readerImage = formData.img ? await fileReader(formData.img[0]) : '';

            const validatedForm: IForm = {
                name: validatedData.name,
                email: validatedData.email,
                age: validatedData.age,
                gender: validatedData.gender,
                password: validatedData.password,
                passwordRepeat: validatedData.passwordRepeat,
                country: validatedData.country,
                img: readerImage,
                acceptTC: validatedData.acceptTC ?? true,
            };

            dispatch(addNewForm(validatedForm));
            setErrors({});
            navigate(RouterPage.MAIN);
        } else {
            setErrors(errorMessages);
        }
    };

    return (
        <form className="form" autoComplete="on" onSubmit={handleSubmit}>
            <UncontrolledInput
                {...FormFieldsData.name}
                inputRef={nameRef}
                error={errors['name']}
            />
            <UncontrolledInput
                {...FormFieldsData.email}
                inputRef={emailRef}
                error={errors['email']}
            />

            <div className="form-wrapper">
                <UncontrolledInput
                    {...FormFieldsData.age}
                    inputRef={ageRef}
                    error={errors['age']}
                />
                <UncontrolledSelect
                    {...FormFieldsData.gender}
                    data={['Male 👦', 'Female 👧']}
                    inputRef={genderRef}
                    error={errors['gender']}
                />
            </div>

            <div className="form__passwords">
                <UncontrolledInput
                    {...FormFieldsData.password}
                    inputRef={passwordRef}
                    error={errors['password']}
                />
                <UncontrolledInput
                    {...FormFieldsData.passwordRepeat}
                    inputRef={passwordRepeatRef}
                    error={errors['passwordRepeat']}
                />
            </div>

            <UncontrolledSelect
                {...FormFieldsData.countries}
                data={countries}
                inputRef={countryRef}
                error={errors['country']}
            />
            <UncontrolledInput
                {...FormFieldsData.img}
                inputRef={imgRef}
                error={errors['img']}
            />
            <UncontrolledCheckbox
                {...FormFieldsData.acceptTC}
                inputRef={acceptTCRef}
                error={errors['acceptTC']}
            />

            <input type="submit" className="form__submit"/>
        </form>
    );
};
