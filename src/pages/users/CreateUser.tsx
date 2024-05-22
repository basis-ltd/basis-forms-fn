import Modal from '@/components/containers/Modal';
import Button from '@/components/inputs/Button';
import Input from '@/components/inputs/Input';
import Select from '@/components/inputs/Select';
import { ROLES } from '@/constants/auth';
import { capitalizeString } from '@/helpers/strings';
import validateInputs from '@/helpers/validations';
import { Controller, FieldValues, useForm } from 'react-hook-form';

type CreateUserProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateUser = ({ isOpen, onClose }: CreateUserProps) => {
  // REACT HOOK FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  // HANDLE FORM SUBMISSION
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
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
                <Select required label="Institution" {...field} />
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
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default CreateUser;
