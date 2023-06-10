import LoginLayout from "@/components/common/layout/loginLayout";
import LoadingSpinner from "@/components/common/loader";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from 'react-toastify';

interface SignupType {
  name: string;  
  email: string;
  password: string;
  password_confirm: string;
}
const SignupPage = () => {
  const methods = useForm<SignupType>({ mode: "onBlur" });
  const [errorMessage, setErrorMessage] = useState<any>();
  const [passworderror, setPasswordError] = useState<any>();
  const [loading,setLoading] = useState<boolean>(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: SignupType) => {
    setLoading(true)
    if(data.password!==data.password_confirm){
    setLoading(false)
      setPasswordError('password and confirm password does not match');
    }else{    
    try {
      setPasswordError('');
      setErrorMessage('')
      await signUp(data.name,data.email, data.password);
      toast.success("user registration successfully please login.")
      setLoading(false)
      router.push("/login");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setLoading(false)
          setErrorMessage("these email id already exists please verify and try to login");
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
    }
  };

  return (
    <LoginLayout>
    <div className="sign-up-form container mx-auto w-96 mt-4 border-2 border-gray-400">
      <h2 className="px-8 mt-4 text-center text-2xl font-semibold text-blue-900">Sign Up</h2>
      <FormProvider {...methods}>
        <form action="" noValidate className="w-80 mx-auto pb-12 px-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Name
              </label>
            </div>

            <input
              type="text"
              {...register("name", { required: "name is required" })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.name && <p className="text-red-400">{errors.name.message}</p>}

          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Email
              </label>
            </div>

            <input
              type="email"
              {...register("email", { required: "Email is required", pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }})}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errorMessage && <p className="text-red-400">{errorMessage}</p>}
            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Password
              </label>
            </div>

            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be more than 6 characters" }, maxLength: { value: 12, message: "Password cannot exceed more than 12 characters" } })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label htmlFor="" className="block mb-3 font-sans text-blue-900">
                Confirm Password
              </label>
            </div>
            <input
              type="password"
              {...register("password_confirm", {
                required: "Verify your password"
              })}
              className={`border border-solid rounded-lg ring:0 focus:ring-0 focus:outline-none border-gray-400 text-gray-500 text-normal py-3 h-12 px-6 text-lg w-full flex items-center`}
            />
            {passworderror && <p className="text-red-400">{passworderror}</p>}
            {/* {errors.password_confirm && (
              <p className="text-red-400">{errors.password_confirm.message}</p>
            )} */}
          </div>
          {loading ? <LoadingSpinner /> :<div className="flex justify-center pt-4">
            <button
              type="submit"
              className={`h-12 text-center w-2/3 bg-blue-900 border-2 rounded-md hover:shadow-lg hover:bg-blue-800 text-lg transition`}
            >
              <p className="capitalize text-white font-normal">submit</p>
            </button>
          </div>
}
          <Link href="/login" className="mt-4 flex justify-center">Back to login</Link>
        </form>
      </FormProvider>
    </div>
    </LoginLayout>
  );
};

export default SignupPage;