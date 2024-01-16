"use client";

import { useEffect, useState } from "react";
import Input from "./input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SafeUser } from "@/types";

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push("/");
        router.refresh();
        toast.success("Logged in");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return <p className="text-center">Logged in. Redirectiong....</p>;
  }

  return (
    <>
      <h2 className="text-2xl">Sign in to E-shop</h2>
      <button
        onClick={() => {
          signIn("google");
        }}
        className="w-full bg-blue-200 p-2 flex items-center justify-center gap-2 rounded-lg"
      >
        <AiOutlineGoogle />
        <p>Sign in with Google</p>
      </button>
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <button
        className="bg-blue-200 p-2 rounded-lg w-full"
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading ? "Loading" : "Sign in"}
      </button>
      <p>
        Do you not have an account?{" "}
        <Link href="/register" className="underline">
          Sign up.{" "}
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
