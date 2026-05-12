"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Key,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/app/Components/UI/Button/Button";
import { InputField } from "@/app/Components/TextField/InputField";
import { Heading } from "@/app/Components/Typography/TypoGraphy";



type ProfileForm = {
  name: string;
  email: string;
};

type PasswordForm = {
  current: string;
  new: string;
  confirm: string;
};

export default function AccountSettingsPage() {

  const [toast, setToast] = useState<string | null>(null);

  // ✅ Profile Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: "Alexander Pierce",
      email: "alex.pierce@nexus-admin.io",
    },
  });

  // ✅ Password Form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    reset,
    formState: { errors: passwordErrors },
  } = useForm<PasswordForm>();

  const newPassword = watch("new");

  // --- Handlers ---
  const onProfileSubmit = (data: ProfileForm) => {
    console.log("Profile:", data);


    triggerToast("Profile updated successfully");
  };

  const onPasswordSubmit = (data: PasswordForm) => {
    if (data.new !== data.confirm) return;

    console.log("Password:", data);

    reset();

    triggerToast("Password updated successfully");
  };

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 ">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <CheckCircle2 size={18} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-zinc-500 text-sm">
            Manage your profile and security
          </p>
        </div>

        {/* PROFILE */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-6">
            <Heading>Profile</Heading>
          </div>

          <AnimatePresence>

            <motion.form
              onSubmit={handleSubmit(onProfileSubmit)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 grid gap-6"
            >
              <InputField
                label="Full Name"
                leftIcon={<User size={16} />}
                {...register("name", {
                  required: "Name is required",
                })}
                error={errors.name?.message}
              />

              <InputField
                label="Email"
                leftIcon={<Mail size={16} />}
                {...register("email", {
                  required: "Email is required",
                })}
                error={errors.email?.message}
              />

              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </motion.form>

          </AnimatePresence>
        </div>

        {/* PASSWORD */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100">


          <Heading>Change Password</Heading>


          <AnimatePresence>

            <motion.form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 space-y-5"
            >
              <InputField
                label="Current Password"
                type="password"
                leftIcon={<Key size={16} />}
                {...registerPassword("current", {
                  required: "Required",
                })}
                error={passwordErrors.current?.message}
              />

              <InputField
                label="New Password"
                type="password"
                leftIcon={<Key size={16} />}
                {...registerPassword("new", {
                  required: "Required",
                  minLength: {
                    value: 6,
                    message: "Min 6 characters",
                  },
                })}
                error={passwordErrors.new?.message}
              />

              <InputField
                label="Confirm Password"
                type="password"
                leftIcon={<Key size={16} />}
                {...registerPassword("confirm", {
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                error={passwordErrors.confirm?.message}
              />

              <div className="flex justify-end gap-3">

                <Button type="submit">Update Password</Button>
              </div>
            </motion.form>

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}