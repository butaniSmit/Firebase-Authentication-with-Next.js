import LoginLayout from "@/components/common/layout/loginLayout";
import LoadingSpinner from "@/components/common/loader";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from 'react-toastify';

interface LoginType {
  email: string;
  password: string;
}
const LoginPage = () => {
  const methods = useForm<LoginType>({ mode: "onBlur" });
  const [errorMessage, setErrorMessage] = useState<any>();
  const [loading,setLoading] = useState<boolean>(false);
  const { logIn } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: LoginType) => {
    setLoading(true)
    try {
        setErrorMessage('')
      await logIn(data.email, data.password);
      toast.success("you have successfully logged in.")
      setLoading(false)
      router.push("/");
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email":
        case "auth/wrong-password":
        case "auth/user-not-found":  
        setLoading(false)
          setErrorMessage("These credentials do not match our records.");
          break;
        case "auth/too-many-requests":
          setLoading(false)
          setErrorMessage(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
          );
          break;
        default:
          setLoading(false)
          return setErrorMessage("Oops Something went wrong");
      }
    }
  };
  return (
    <LoginLayout>
      <div className="sign-up-form container mx-auto w-96 mt-12 border-2 border-gray-400">
        <h2 className="px-12 mt-8 text-center text-2xl font-semibold text-blue-900">
          Log In
        </h2>
        <FormProvider {...methods}>
          <form
            action=""
            noValidate
            className="w-80 mx-auto pb-12 px-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  className="block mb-3 font-sans text-blue-900"
                >
                  Email
                </label>
              </div>

              <input
                type="email"
                {...register("email", { required: "Email is required",pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address"
                  } })}
                className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
              />
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <label
                  htmlFor=""
                  className="block mb-3 font-sans text-blue-900"
                >
                  Password
                </label>
              </div>

              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
              />
              {errors.password && (
                <p className="text-red-400">{errors.password.message}</p>
              )}
            </div>
            {errorMessage && <p className="text-red-400">{errorMessage}</p>}
            <Link href="/resetpassword" className="mt-4 flex justify-center">Forgot password?</Link>
            {loading ? <LoadingSpinner /> : <div className="flex justify-center pt-8">
            
            <button
              type="submit"
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >
              <p className="capitalize text-white font-normal">submit</p>
            </button>
          </div>}
            
            <div className="mt-4">Don't have an account? <Link href='/signup'>Register here</Link></div>
          </form>
        </FormProvider>
      </div>
      </LoginLayout>
  );
};

export default LoginPage;
