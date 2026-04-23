"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { Card } from "@/app/Components/UI/Card";
import { Heading } from "@/app/Components/UI/Heading";
import { Button } from "@/app/Components/UI/Button/Button";
import { ErrorMessage } from "@/app/Components/Common/ErrorMessage";
import { InputField } from "@/app/Components/TextField/InputField";
import { adminAPI } from "@/app/API/admin.api";
import { getErrorMessage } from "@/app/utils/utilityFunction";
import toast from "react-hot-toast";


interface LoginPayload {
  email: string;
  password: string;
}

export default function AdminLoginClient() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });




  // ================= MUTATION =================
  const { mutate, isPending } = useMutation({
    mutationFn: adminAPI.login,

    onSuccess: (data: any) => {

      router.push("/admin/admin-pages/dashboard");
      toast.success(data.message);
    },

    onError: (error: any) => {
      const message = getErrorMessage(error);

      toast.error(message);
    },
  });




  // ================= SUBMIT =================
  const onSubmit = (values: LoginPayload) => {
    clearErrors("root.server");
    mutate(values);
  };



  const serverError = errors.root?.server?.message;







  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-soft p-4">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="disney-shadow w-full border-4 border-white p-10">
          <div className="mb-10 text-center">
            <div className="mb-6 inline-block rounded-3xl bg-primary p-4">
              <Sun className="h-10 w-10 text-white" aria-hidden="true" />
            </div>

            <Heading>Admin Access</Heading>

          </div>

          {/* ================= ERROR ================= */}
          <AnimatePresence mode="wait" initial={false}>
            {serverError && (
              <motion.div
                key="login-error"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <ErrorMessage message={serverError} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <InputField
              id="admin-email"
              label="Email"
              type="email"
              placeholder="admin@gmail.com"
              autoComplete="username"
              error={errors.email?.message}
              disabled={isPending}
              {...register("email", {
                required: "Email is required",
                minLength: {
                  value: 6,
                  message: "Email must be at least 6 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Email must be less than 100 characters",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email address",
                },
                validate: {
                  noSpaces: (value) =>
                    value.trim() === value ||
                    "Email cannot start or end with spaces",
                  notEmptyAfterTrim: (value) =>
                    value.trim().length > 0 || "Email is required",
                },
              })}
            />

            <InputField
              id="admin-password"
              label="Password"
              type="password"
              placeholder="********"
              autoComplete="current-password"
              error={errors.password?.message}
              disabled={isPending}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 64,
                  message: "Password must be less than 64 characters",
                },
                validate: {
                  notOnlySpaces: (value) =>
                    value.trim().length > 0 ||
                    "Password cannot be empty or only spaces",
                },
              })}
            />

            <Button
              type="submit"
              className="w-full py-6 text-xl"
              isLoading={isPending}
              disabled={isPending}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}