import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { convertToBase64Util } from '../../utils/convert-to-base64.util.ts';
import { UncontrolledCheckbox } from '../checkbox/uncontrolled-checkbox';
import { UncontrolledInput } from '../input/uncontrolled-input';
import { UncontrolledSelect } from '../select/uncontrolled-select';
import { RouterPage } from '../../router.tsx';
import { addNewForm } from '../../store/slice.ts';
import { FormFieldsData } from '../../data/form-fields-data.ts';
import { validationSchema } from '../../utils/validation.util.ts';
import { ValidationError } from 'yup';
import { AppFields, IForm, ValidatingFormData } from '../../types.ts';
import { GENDERS } from '../../data/common.ts';

export const UncontrolledForm = () => {
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countries);
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

    let isValid: boolean;
    let validatedData: AppFields | null = null;
    let errorMessages: Record<string, string> = {};
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
      const validatedForm = await validationSchema.validate(formData, {
        abortEarly: false,
      });
      isValid = true;
      validatedData = validatedForm;
    } catch (e) {
      if (e instanceof ValidationError) {
        e.inner.forEach((error) => {
          if (typeof error.path === 'string') {
            errorMessages[error.path] = error.message;
          }
        });
      }
      isValid = false;
    }

    if (isValid && validatedData) {
      const validatedForm: IForm = {
        name: validatedData.name,
        email: validatedData.email,
        age: validatedData.age,
        gender: validatedData.gender,
        password: validatedData.password,
        passwordRepeat: validatedData.passwordRepeat,
        country: validatedData.country,
        img: formData.img
          ? await convertToBase64Util((formData.img as FileList)[0])
          : '',
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
        ref={nameRef}
        error={errors['name']}
      />
      <UncontrolledInput
        {...FormFieldsData.email}
        ref={emailRef}
        error={errors['email']}
      />
      <UncontrolledInput
        {...FormFieldsData.age}
        ref={ageRef}
        error={errors['age']}
      />
      <UncontrolledSelect
        {...FormFieldsData.gender}
        data={GENDERS}
        ref={genderRef}
        error={errors['gender']}
      />
      <UncontrolledInput
        {...FormFieldsData.password}
        ref={passwordRef}
        error={errors['password']}
      />
      <UncontrolledInput
        {...FormFieldsData.passwordRepeat}
        ref={passwordRepeatRef}
        error={errors['passwordRepeat']}
      />
      <UncontrolledSelect
        {...FormFieldsData.countries}
        data={countries}
        ref={countryRef}
        error={errors['country']}
      />
      <UncontrolledInput
        {...FormFieldsData.img}
        ref={imgRef}
        error={errors['img']}
      />
      <UncontrolledCheckbox
        {...FormFieldsData.acceptTC}
        ref={acceptTCRef}
        error={errors['acceptTC']}
      />

      <input type="submit" className="form-submit" />
    </form>
  );
};
