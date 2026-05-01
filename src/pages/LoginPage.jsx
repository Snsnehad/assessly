import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useAuth } from "../hooks/useAuth.jsx";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Demo users
  const DEMO_USERS = {
    admin: {
      email: "admin@assessly.io",
      password: "admin123",
      role: "admin",
    },
    user: {
      email: "user@assessly.io",
      password: "user123",
      role: "user",
    },
  };

  const onSubmit = (values) => {
    setError("");
    setLoading(true);

    // simulate API delay
    setTimeout(() => {
      const user = Object.values(DEMO_USERS).find(
        (u) =>
          u.email === values.email &&
          u.password === values.password
      );

      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      login(user.role);

      navigate(user.role === "admin" ? "/admin" : "/assessment");
    }, 800);
  };

  return (
    <div className="glass-card p-8 max-w-md mx-auto">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
        Welcome back
      </p>

      <h1 className="text-3xl font-semibold">Sign in to Assessly</h1>

      {/* ✅ Demo Credentials Info */}
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Demo:
        {/* <br />
        Admin → admin@assessly.io / admin123 */}
        <br />
        User → user@assessly.io / user123
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <InputField
          label="Email"
          placeholder="name@company.com"
          error={errors.email?.message}
          {...register("email", {
  required: "Email is required",
  setValueAs: (value) => value.trim(), // 🔥 FIX
  pattern: {
    value: /^\S+@\S+\.\S+$/,
    message: "Invalid email address",
  },
          })}
        />

        {/* Password */}
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
          })}
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-500 dark:text-slate-400">
          Demo access enabled
        </span>

        <Link
          to="/signup"
          className="text-slate-500 dark:text-slate-400 hover:underline"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}