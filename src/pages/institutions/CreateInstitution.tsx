import Modal from '@/components/containers/Modal';
import { InputErrorMessage } from '@/components/feedbacks/ErrorLabels';
import Button from '@/components/inputs/Button';
import Combobox from '@/components/inputs/Combobox';
import Input from '@/components/inputs/Input';
import Loader from '@/components/inputs/Loader';
import { capitalizeString } from '@/helpers/strings';
import validateInputs from '@/helpers/validations';
import {
  useCreateInstitutionMutation,
  useLazyFetchCategoriesQuery,
} from '@/state/api/apiSlice';
import { setCategoriesList } from '@/state/features/categorySlice';
import {
  setCreateInstitutionModal,
  updateInstitutionsList,
} from '@/state/features/institutionSlice';
import { AppDispatch, RootState } from '@/state/store';
import { Category } from '@/types/models/category';
import { useEffect } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorResponse } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateInstitution = () => {
  // REACT HOOK FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { createInstitutionModal } = useSelector(
    (state: RootState) => state.institution
  );
  const { categoriesList } = useSelector((state: RootState) => state.category);

  // INITIALIZE FETCH CATEGORIES QUERY
  const [
    fetchCategories,
    {
      data: categoriesData,
      error: categoriesError,
      isLoading: categoriesIsLoading,
      isSuccess: categoriesIsSuccess,
      isError: categoriesIsError,
    },
  ] = useLazyFetchCategoriesQuery();

  // FETCH CATEGORIES
  useEffect(() => {
    fetchCategories({});
  }, [fetchCategories]);

  // HANDLE FETCH CATEGORIES RESPONSE
  useEffect(() => {
    if (categoriesIsError) {
      if ((categoriesError as ErrorResponse)?.status === 500) {
        toast.error('Failed to fetch categories. Please try again later.');
      } else {
        toast.error((categoriesError as ErrorResponse)?.data?.message);
      }
    } else if (categoriesIsSuccess) {
      dispatch(setCategoriesList(categoriesData?.data));
    }
  }, [
    categoriesData,
    categoriesError,
    categoriesIsError,
    categoriesIsSuccess,
    dispatch,
  ]);

  // INTIALIZE CREATE INSTITUTION MUTATION
  const [
    createInstitution,
    {
      data: createInstitutionData,
      error: createInstitutionError,
      isLoading: createInstitutionIsLoading,
      isSuccess: createInstitutionIsSuccess,
      isError: createInstitutionIsError,
    },
  ] = useCreateInstitutionMutation();

  // HANDLE FORM SUBMISSION
  const onSubmit = (data: FieldValues) => {
    createInstitution({
      categoryId: data.categoryId,
      email: data.email,
      name: data.name,
      phone: data.phone,
    });
  };

  // HANDLE CREATE INSTITUTION RESPONSE
  useEffect(() => {
    if (createInstitutionIsError) {
      if ((createInstitutionError as ErrorResponse)?.status === 500) {
        toast.error('Failed to create institution. Please try again later.');
      } else {
        toast.error((createInstitutionError as ErrorResponse)?.data?.message);
      }
    } else if (createInstitutionIsSuccess) {
      toast.success('Institution created successfully');
      dispatch(updateInstitutionsList(createInstitutionData?.data));
      dispatch(setCreateInstitutionModal(false));
    }
  }, [
    createInstitutionData,
    createInstitutionError,
    createInstitutionIsError,
    createInstitutionIsSuccess,
    dispatch,
  ]);

  return (
    <Modal
      isOpen={createInstitutionModal}
      onClose={() => {
        dispatch(setCreateInstitutionModal(false));
      }}
      heading="Add new institution"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Name is required' }}
          render={({ field }) => {
            return (
              <label className="flex flex-col gap-1">
                <Input label="Name" required {...field} />
                {errors.name && (
                  <InputErrorMessage message={String(errors.name.message)} />
                )}
              </label>
            );
          }}
        />
        <Controller
          name="email"
          rules={{
            required: 'Email is required',
            validate: (value) =>
              validateInputs(value, 'email') || 'Invalid email address',
          }}
          control={control}
          render={({ field }) => {
            return (
              <label className="flex flex-col gap-1">
                <Input
                  label="Email"
                  required
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger(field.name);
                  }}
                />
                {errors.email && (
                  <InputErrorMessage message={String(errors.email.message)} />
                )}
              </label>
            );
          }}
        />
        <Controller
          name="phone"
          rules={{
            validate: (value) =>
              value?.length
                ? validateInputs(value, 'tel') || 'Invalid phone number'
                : true,
          }}
          control={control}
          render={({ field }) => {
            return (
              <label className="flex flex-col gap-1">
                <Input
                  label="Phone"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger(field.name);
                  }}
                />
                {errors.phone && (
                  <InputErrorMessage message={String(errors.phone.message)} />
                )}
              </label>
            );
          }}
        />
        <Controller
          name="categoryId"
          rules={{ required: 'Select category' }}
          control={control}
          render={({ field }) => {
            return (
              <label className="flex flex-col gap-1">
                <Combobox
                  options={categoriesList?.map((category: Category) => {
                    return {
                      label: capitalizeString(category.name),
                      value: category.id,
                    };
                  })}
                  {...field}
                  placeholder={
                    categoriesIsLoading ? 'Loading...' : 'Select category'
                  }
                />
                {errors.categoryId && (
                  <InputErrorMessage
                    message={String(errors.categoryId.message)}
                  />
                )}
              </label>
            );
          }}
        />
        <Button primary submit>
          {createInstitutionIsLoading ? <Loader /> : 'Submit'}
        </Button>
      </form>
    </Modal>
  );
};

export default CreateInstitution;
