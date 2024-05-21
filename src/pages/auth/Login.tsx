import Input from '@/components/inputs/Input';
import basisLogo from '/basis_logo.png';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/inputs/Button';
import { ResponseErrorType, useLoginMutation } from '@/state/api/apiSlice';
import { useEffect } from 'react';

const Login = () => {
  // REACT HOOK FORM
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // INITIALIZE LOGIN REQUEST
  const [
    login,
    {
      isLoading: loginIsLoading,
      isError: loginIsError,
      error: loginError,
      data: loginData,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginMutation();

  // HANDLE FORM SUBMISSION
  const onSubmit = (data: FieldValues) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  // HANDLE LOGIN RESPONSE
  useEffect(() => {
    if (loginIsError) {
      if ((loginError as ResponseErrorType)?.status === 500) {
        alert('Server Error');
      } else {
        alert((loginError as ResponseErrorType)?.data?.message);
      }
    } else if (loginIsSuccess) {
      alert(JSON.stringify(loginData));
    }
  }, [loginData, loginIsError, loginError, loginIsSuccess]);

  return (
    <main className="w-full h-[100vh] flex items-center justify-center p-4 bg-primary">
      <section className="flex flex-col gap-6 w-[35%] mx-auto p-8 rounded-md shadow-xl bg-white">
        <figure className="w-28 h-28 mx-auto">
          <img src={basisLogo} alt="Basis Logo" className="object-fit" />
        </figure>
        <h1 className="text-center mx-auto uppercase font-medium">
          Log into your{' '}
          <span className="uppercase text-primary font-bold">Basis Forms</span>{' '}
          account
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-4"
        >
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Email is required' }}
            render={({ field }) => {
              return (
                <label className="flex flex-col gap-1 w-full">
                  <Input
                    placeholder="Email address"
                    label="Email"
                    required
                    {...field}
                  />
                  {errors.email && (
                    <p className="text-[13px]">
                      {String(errors.email.message)}
                    </p>
                  )}
                </label>
              );
            }}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field }) => {
              return (
                <label className="flex flex-col gap-1 w-full">
                  <Input
                    placeholder="Password"
                    label="Password"
                    type="password"
                    required
                    {...field}
                  />
                  {errors.password && (
                    <p className="text-[13px]">
                      {String(errors.password.message)}
                    </p>
                  )}
                </label>
              );
            }}
          />
          <Button submit primary>{loginIsLoading ? 'Loading...' : 'Login'}</Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
