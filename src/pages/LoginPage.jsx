import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth.jsx";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "aarav@example.com", password: "password123" },
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    login(values.email.includes("admin") ? "admin" : "user");
    navigate(values.email.includes("admin") ? "/admin" : "/dashboard");
  };

  return (
    <div className="glass-card p-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
        Welcome back
      </p>
      <h1 className="text-3xl font-semibold">Sign in to Assessly</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Use `admin@assessly.io` to preview admin pages.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Email"
          placeholder="name@company.com"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password", { required: "Password is required" })}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">Demo access enabled</span>
        <Link to="/signup" className="text-slate-500 dark:text-slate-400">
          Create account
        </Link>
      </div>
    </div>
  );
}
