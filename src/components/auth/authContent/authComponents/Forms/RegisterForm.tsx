import { useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import axios from "axios";
import { PillButton } from "../../ui/PillButton";
import { Field, PasswordField } from "../fields";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext.tsx";
import { useAuthUI } from "../../../store/auth-ui.ts";

const validationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters",
    "string.empty": "Tell us your name",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "string.empty": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]"))
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base": "Password must contain at least one letter, one number, and one special character",
      "string.empty": "Password is required",
    }),
});




export function RegisterForm() {

  const { toggle, animating } = useAuthUI();
  const { setUserRegistered } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const { error } = validationSchema.validate(values, { abortEarly: false });
      if (!error) return {};

      const errors: Record<string, string> = {};
      error.details.forEach((detail) => {
        const key = detail.path[0] as string;
        if (!errors[key]) {
          errors[key] = detail.message;
        }
      });

      return errors;
    },

    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form submitted values:", values);
      const toastId = toast.loading("Creating your account...");

      try {
        const response = await axios.post("https://ahmed-mohamed-task.vercel.app/auth/signup", {
          name: values.name,
          email: values.email,
          password: values.password,
        });
       
        if (response.status === 200 || response.status === 201) {
          toast.success("Account created successfully — redirecting to sign in!", { id: toastId });
          setUserRegistered(true);

          setTimeout(() => {
            toggle();
          }, 1200);
        }

      } catch (err: any) {
        console.error("API Error:", err);
        const errorMessage = err.response?.data?.message || "An error occurred during registration";
        toast.error(errorMessage, { id: toastId });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} inert={animating || undefined} noValidate className="flex flex-col gap-4">
      <Field
        id="name"
        label="Name"
        autoComplete="name"
        placeholder="Jane Doe"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
      />
      <PasswordField
        id="password"
        label="Password"
        autoComplete="new-password"
        placeholder="At least 8 characters"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
      />

      <div data-reveal className="pt-1">
        <PillButton type="submit" variant="dark" withArrow full disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Creating account…" : "Create account"}
        </PillButton>
      </div>

      <p aria-live="polite" className="min-h-4 text-center text-xs text-accent">
        {formik.isSubmitting ? "Processing..." : ""}
      </p>
    </form>
  );
}