import { useFormik } from "formik";
import Joi from "joi";
import axios from "axios";
import { PillButton } from "../../ui/PillButton";
import { Field, PasswordField } from "../fields";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";


const validationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Enter a valid email address",
      "string.empty": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.empty": "Password is required",
    }),
});

export function LoginForm() {
  const { login, setUserRegistered, setLoaderExit, loaderExit } = useAuth();

  const navigate = useNavigate();





  const formik = useFormik({


    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const { error } = validationSchema.validate(values, {
        abortEarly: false,
      });

      if (!error) return {};

      const errors: Record<string, string> = {};

      error.details.forEach((d) => {
        const key = d.path[0] as string;

        if (!errors[key]) {
          errors[key] = d.message;
        }
      });

      return errors;
    },



    onSubmit: async (values) => {
      const toastId = toast.loading("Signing in to your account...");
      setLoaderExit(true);


      try {
       const response = await axios.post(
          "https://ahmed-mohamed-task.vercel.app/auth/signin",
          {
            email: values.email,
            password: values.password,
          }
        );

        const token = response.data.token || response.data.accessToken;

        if ((response.status === 200 || response.status === 201) && token) {

          toast.success("Signed in successfully — welcome back!", { id: toastId });
       


          login(token, response.data.user);
          


          navigate("/UserDashboard");
          return;
        }
     
        throw new Error("No token returned");



      } catch (err: any) {

        const message = err.response?.data?.message || "Wrong email or password";
        toast.error(message, { id: toastId, });


      }
    },
  });
  

  

  return <>

    <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-4">
    

      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : undefined
        }
      />
      <PasswordField
        id="password"
        label="Password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : undefined
        }
      />




      <div data-reveal className="pt-1">
        <PillButton
          type="submit"
          variant="dark"
          withArrow
          full
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Signing in…" : "Sign in"}
        </PillButton>
      </div>
    </form>
   
  </>
}