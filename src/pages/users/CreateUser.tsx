import Modal from '@/components/containers/Modal';
import Button from '@/components/inputs/Button';
import Combobox from '@/components/inputs/Combobox';
import Input from '@/components/inputs/Input';
import Loader from '@/components/inputs/Loader';
import Select from '@/components/inputs/Select';
import { ROLES } from '@/constants/auth';
import { capitalizeString } from '@/helpers/strings';
import validateInputs from '@/helpers/validations';
import {
  useCreateUserMutation,
  useLazyFetchInstitutionsQuery,
} from '@/state/api/apiSlice';
import { setInstitutionsList } from '@/state/features/institutionSlice';
import { setCreateUserModal, updateUsersList } from '@/state/features/userSlice';
import { AppDispatch, RootState } from '@/state/store';
import { Institution } from '@/types/models/institution';
import { useEffect } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorResponse } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateUser = () => {
  // STATE VARIABLES
  const dispatch: AppDispatch = useDispatch();
  const { institutionsList } = useSelector(
    (state: RootState) => state.institution
  );
  const { createUserModal } = useSelector((state: RootState) => state.user);

  // REACT HOOK FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  // INITIALIZE FETCH INSTITUTIONS
  const [
    fetchInstitutions,
    {
      data: institutionsData,
      error: institutionsError,
      isLoading: institutionsIsLoading,
      isSuccess: institutionsIsSuccess,
      isError: institutionsIsError,
    },
  ] = useLazyFetchInstitutionsQuery();

  // INITIALIZE CREATE USER MUTATION
  const [
    createUser,
    {
      data: createUserData,
      error: createUserError,
      isLoading: createUserIsLoading,
      isSuccess: createUserIsSuccess,
      isError: createUserIsError,
    },
  ] = useCreateUserMutation();

  // FETCH INSTITUTIONS
  useEffect(() => {
    fetchInstitutions({
      categoryId: undefined,
    });
  }, [fetchInstitutions]);

  // HANDLE FORM SUBMISSION
  const onSubmit = (data: FieldValues) => {
    createUser({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      institutionId: data.institutionId,
      role: data.role,
    });
  };

  // HANDLE INSTITUTIONS RESPONSE
  useEffect(() => {
    if (institutionsIsError) {
      if ((institutionsError as ErrorResponse)?.status === 500) {
        toast.error('Failed to fetch institutions. Please try again later.');
      } else {
        toast.error((institutionsError as ErrorResponse)?.data?.message);
      }
    } else if (institutionsIsSuccess) {
      dispatch(setInstitutionsList(institutionsData?.data));
    }
  }, [
    institutionsData,
    institutionsError,
    institutionsIsLoading,
    institutionsIsSuccess,
    institutionsIsError,
    dispatch,
  ]);

  // HANDLE CREATE USER RESPONSE
  useEffect(() => {
    if (createUserIsError) {
      if ((createUserError as ErrorResponse)?.status === 500) {
        toast.error('Failed to create user. Please try again later.');
      } else {
        toast.error((createUserError as ErrorResponse)?.data?.message);
      }
    } else if (createUserIsSuccess) {
      toast.success(
        'User created successfully. An email containing the login details has been sent to their inbox.'
      );
      dispatch(updateUsersList(createUserData?.data));
      dispatch(setCreateUserModal(false));
    }
  }, [
    createUserIsError,
    createUserError,
    createUserIsSuccess,
    dispatch,
    createUserData?.data,
  ]);

  return (
    <Modal
      isOpen={createUserModal}
      onClose={() => {
        dispatch(setCreateUserModal(false));
      }}
      heading="Add new user"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Controller
          control={control}
          name="firstName"
          rules={{ required: 'First name is required' }}
          render={({ field }) => {
            return (
              <label className="flex flex-col gap-1 w-full">
                <Input label="First name" required {...field} />
                {errors.firstName && (
                  <p className="text-red-500 text-[12px]">
                    {String(errors.firstName.message)}
                  </p>
                )}
              </label>
            );
          }}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => {
            return (
              <label className="flex flex-col gap-1 w-full">
                <Input label="Last name" {...field} />
              </label>
            );
          }}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Email address is required',
            validate: (value) =>
              validateInputs(value, 'email') || 'Invalid email address',
          }}
          render={({ field }) => {
            return (
              <label className="flex flex-col gap-1 w-full">
                <Input
                  label="Email address"
                  required
                  {...field}
                  onChange={async (e) => {
                    field.onChange(e);
                    await trigger(field.name);
                  }}
                />
                {errors.email && (
                  <p className="text-red-500 text-[12px]">
                    {String(errors.email.message)}
                  </p>
                )}
              </label>
            );
          }}
        />
        <Controller
          name="institutionId"
          control={control}
          rules={{ required: "Select the user's institution" }}
          render={({ field }) => {
            return (
              <label className="flex flex-col gap-1 w-full">
                <Combobox
                  options={institutionsList?.map((institution: Institution) => {
                    return {
                      label: institution.name,
                      value: institution.id,
                    };
                  })}
                  required
                  label="Institution"
                  {...field}
                />
                {errors.institutionId && (
                  <p className="text-red-500 text-[12px]">
                    {String(errors.institutionId.message)}
                  </p>
                )}
              </label>
            );
          }}
        />
        <Controller
          name="role"
          control={control}
          rules={{ required: "Select user's role" }}
          render={({ field }) => {
            return (
              <label className="flex flex-col gap-1 w-full">
                <Select
                  options={ROLES?.map((role) => {
                    return {
                      label: capitalizeString(role),
                      value: role,
                    };
                  })}
                  required
                  label="Role"
                  {...field}
                />
                {errors.role && (
                  <p className="text-red-500 text-[12px]">
                    {String(errors.role.message)}
                  </p>
                )}
              </label>
            );
          }}
        />
        <Button primary submit>
          {createUserIsLoading ? <Loader /> : 'Create user'}
        </Button>
      </form>
    </Modal>
  );
};

export default CreateUser;
