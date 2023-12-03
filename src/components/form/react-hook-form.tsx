import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validation.ts";
import { RHKInput } from "../input/rhk-input.tsx";
import { AppFields, IForm } from "../../types.ts";
import { RouterPage } from "../../utils/router.tsx";
import { fileReader } from "../../utils/file-reader.ts";
import { FormFieldsData } from "../../data/form-fields-data.ts";
import { addNewForm } from "../../store/slice.ts";
import { RHKSelect } from "../select/rhk-select.tsx";
import { GENDERS } from "../../data/common.ts";
import { RHKCheckbox } from "../checkbox/rhk-checkbox.tsx";

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
    const readerImage = formData.img ? await fileReader(formData.img[0]) : '';

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
      <RHKInput
        {...FormFieldsData.name}
        register={register}
        error={errors.name}
      />
      <RHKInput
        {...FormFieldsData.email}
        register={register}
        error={errors.email}
      />

      <div className="form-wrapper">
        <RHKInput
          {...FormFieldsData.age}
          register={register}
          error={errors.age}
        />
        <RHKSelect
          {...FormFieldsData.gender}
          data={GENDERS}
          register={register}
          error={errors.gender}
        />
      </div>

      <div className="form__passwords">
        <RHKInput
          {...FormFieldsData.password}
          register={register}
          error={errors.password}
        />
        <RHKInput
          {...FormFieldsData.passwordRepeat}
          register={register}
          error={errors.passwordRepeat}
        />
      </div>

      <RHKSelect
        {...FormFieldsData.countries}
        data={countries}
        register={register}
        error={errors['country']}
      />
      <RHKInput
        {...FormFieldsData.img}
        register={register}
        error={errors.img}
      />
      <RHKCheckbox
        {...FormFieldsData.acceptTC}
        register={register}
        error={errors['acceptTC']}
      />

      <input type="submit" className="form__submit"/>
    </form>
  );
};
