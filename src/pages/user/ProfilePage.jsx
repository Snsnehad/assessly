import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import { useAuth } from "../../hooks/useAuth.jsx";
import { useToast } from "../../hooks/useToast.jsx";

export default function ProfilePage() {
  const { user } = useAuth();
  const { notify } = useToast();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      company: "Northwind Labs",
      timezone: "Asia/Calcutta",
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <form
        onSubmit={handleSubmit(() => notify("Profile updated successfully."))}
        className="glass-card space-y-5 p-6"
      >
        <div>
          <h2 className="text-2xl font-semibold">Profile settings</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your personal information and platform preferences.
          </p>
        </div>
        <InputField label="Full name" {...register("name")} />
        <InputField label="Email" {...register("email")} />
        <InputField label="Company" {...register("company")} />
        <SelectField label="Timezone" {...register("timezone")}>
          <option>Asia/Calcutta</option>
          <option>UTC</option>
          <option>America/New_York</option>
        </SelectField>
        <Button type="submit">Save changes</Button>
      </form>

      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold">Account snapshot</h3>
        <div className="mt-5 space-y-4 text-sm">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-slate-500">Plan</p>
            <p className="mt-1 font-semibold">Growth</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-slate-500">Report exports</p>
            <p className="mt-1 font-semibold">12 used this month</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
            <p className="text-slate-500">Security</p>
            <p className="mt-1 font-semibold">2FA placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
