import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useToast } from "../hooks/useToast.jsx";

export default function ForgotPasswordPage() {
  const { notify } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="glass-card p-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-600">
        Password recovery
      </p>
      <h1 className="text-3xl font-semibold">Reset access</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        We will send a reset link to your email address.
      </p>
      <form
        className="mt-8 space-y-5"
        onSubmit={handleSubmit(() => notify("Reset link sent to your inbox."))}
      >
        <InputField
          label="Email"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
        />
        <Button className="w-full" type="submit">
          Send reset link
        </Button>
      </form>
      <Link to="/login" className="mt-6 inline-block text-sm text-brand-600">
        Back to login
      </Link>
    </div>
  );
}
