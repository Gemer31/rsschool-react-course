import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/redux-hooks.ts';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../../utils/validation.util.ts';
import { AppFields, IForm } from '../../types.ts';
import { RouterPage } from '../../router.tsx';
import { convertToBase64Util } from '../../utils/convert-to-base64.util.ts';
import { addNewForm } from '../../store/slice.ts';
import { ReactHookFormSelect } from '../select/react-hook-form-select.tsx';
import { GENDERS } from '../../data/common.ts';
import { ReactHookFormCheckbox } from '../checkbox/react-hook-form-checkbox.tsx';
import { ReactHookFormInput } from '../input/react-hook-form-input.tsx';
import { FormFieldsData } from '../../data/form-fields-data.ts';

export const ReactHookForm = () => {
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countries);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmitForm = async (formData: AppFields) => {
    const readerImage = formData.img
      ? await convertToBase64Util(formData.img[0])
      : '';

    const validatedForm: IForm = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      password: formData.password,
      passwordRepeat: formData.passwordRepeat,
      country: formData.country,
      img: readerImage,
      acceptTC: formData.acceptTC ?? true,
    };
    dispatch(addNewForm(validatedForm));
    navigate(RouterPage.MAIN);
  };

  return (
    <form
      className="form"
      autoComplete="on"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <ReactHookFormInput
        {...FormFieldsData.name}
        register={register}
        error={errors.name}
      />
      <ReactHookFormInput
        {...FormFieldsData.email}
        register={register}
        error={errors.email}
      />

      <ReactHookFormInput
        {...FormFieldsData.age}
        register={register}
        error={errors.age}
      />
      <ReactHookFormSelect
        {...FormFieldsData.gender}
        data={GENDERS}
        register={register}
        error={errors.gender}
      />
      <ReactHookFormInput
        {...FormFieldsData.password}
        register={register}
        error={errors.password}
      />
      <ReactHookFormInput
        {...FormFieldsData.passwordRepeat}
        register={register}
        error={errors.passwordRepeat}
      />
      <ReactHookFormSelect
        {...FormFieldsData.countries}
        data={countries}
        register={register}
        error={errors['country']}
      />
      <ReactHookFormInput
        {...FormFieldsData.img}
        register={register}
        error={errors.img}
      />
      <ReactHookFormCheckbox
        {...FormFieldsData.acceptTC}
        register={register}
        error={errors['acceptTC']}
      />

      <input type="submit" className="form-submit" />
    </form>
  );
};
