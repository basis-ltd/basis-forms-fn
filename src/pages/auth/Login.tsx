import Input from '@/components/inputs/Input';
import basisLogo from '/basis_logo.png';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Button from '@/components/inputs/Button';
import { ResponseErrorType, useLoginMutation } from '@/state/api/apiSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/components/inputs/Loader';
import { useNavigate } from 'react-router-dom';
import { InputErrorMessage } from '@/components/feedbacks/ErrorLabels';

const Login = () => {
  // REACT HOOK FORM
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // NAVIGATE
  const navigate = useNavigate();

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
        toast.error('An error occurred. Please try again later.');
      } else {
        toast.error((loginError as ResponseErrorType)?.data?.message);
      }
    } else if (loginIsSuccess) {
      toast.success('Login successful!');
      if (loginData?.user?.role === 'admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [loginData, loginIsError, loginError, loginIsSuccess, navigate]);

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
                    <InputErrorMessage message={String(errors.password.message)} />
                  )}
                </label>
              );
            }}
          />
          <Button submit primary>{loginIsLoading ? <Loader /> : 'Login'}</Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
