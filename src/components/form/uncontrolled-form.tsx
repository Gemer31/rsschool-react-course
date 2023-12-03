import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ValidationError } from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks';
import { convertToBase64Util } from '../../utils/convert-to-base64.util.ts';
import { UncontrolledCheckbox } from '../checkbox/uncontrolled-checkbox';
import { UncontrolledInput } from '../input/uncontrolled-input';
import { UncontrolledSelect } from '../select/uncontrolled-select';
import { RouterPage } from '../../router.tsx';
import { addNewForm, setFormIsNew } from '../../store/slice.ts';
import { FormFieldsData } from '../../data/form-fields-data.ts';
import { validationSchema } from '../../utils/validation.util.ts';
import { AppFields, IStateForm, ValidatingFormData } from '../../types.ts';
import { GENDERS } from '../../data/common.ts';
import { useGetCountriesQuery } from '../../services/countriesAPI.ts';

export function UncontrolledForm() {
  useGetCountriesQuery({});

  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.data);
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
    const errorMessages: Record<string, string> = {};
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
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((item) => {
          if (typeof item.path === 'string') {
            errorMessages[item.path] = item.message;
          }
        });
      }
      isValid = false;
    }

    if (isValid && validatedData) {
      const validatedForm: IStateForm = {
        id: uuidv4(),
        isNew: true,
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
      setTimeout(() => {
        dispatch(
          setFormIsNew({
            ...validatedForm,
            isNew: false,
          })
        );
      }, 5000);
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
        fieldRef={nameRef}
        error={errors.name}
      />
      <UncontrolledInput
        {...FormFieldsData.email}
        fieldRef={emailRef}
        error={errors.email}
      />
      <UncontrolledInput
        {...FormFieldsData.age}
        fieldRef={ageRef}
        error={errors.age}
      />
      <UncontrolledSelect
        {...FormFieldsData.gender}
        data={GENDERS}
        fieldRef={genderRef}
        error={errors.gender}
      />
      <UncontrolledInput
        {...FormFieldsData.password}
        fieldRef={passwordRef}
        error={errors.password}
      />
      <UncontrolledInput
        {...FormFieldsData.passwordRepeat}
        fieldRef={passwordRepeatRef}
        error={errors.passwordRepeat}
      />
      <UncontrolledSelect
        {...FormFieldsData.countries}
        data={countries}
        fieldRef={countryRef}
        error={errors.country}
      />
      <UncontrolledInput
        {...FormFieldsData.img}
        fieldRef={imgRef}
        error={errors.img}
      />
      <UncontrolledCheckbox
        {...FormFieldsData.acceptTC}
        fieldRef={acceptTCRef}
        error={errors.acceptTC}
      />

      <input type="submit" className="form-submit" />
    </form>
  );
}
