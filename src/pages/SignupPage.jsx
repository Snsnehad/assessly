import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth.jsx";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    signup(values);
    navigate("/dashboard");
  };

  return (
    <div className="glass-card p-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
        Get started
      </p>
      <h1 className="text-3xl font-semibold">Create your account</h1>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Full name"
          error={errors.name?.message}
          {...register("name", { required: "Name is required" })}
        />
        <InputField
          label="Work email"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <InputField
          label="Company"
          error={errors.company?.message}
          {...register("company", { required: "Company is required" })}
        />
        <InputField
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-brand-600">
          Sign in
        </Link>
      </p>
    </div>
  );
}
