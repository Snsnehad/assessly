import { useMemo, useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Table from "../../components/Table";
import { users } from "../../data/users";
import { useToast } from "../../hooks/useToast.jsx";

export default function UsersManagementPage() {
  const [search, setSearch] = useState("");
  const { notify } = useToast();

  const filtered = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-[260px] flex-1">
            <InputField label="Search users" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="secondary" onClick={() => notify("Export placeholder triggered.")}>
            Export CSV
          </Button>
        </div>
      </div>

      <Table
        columns={["Name", "Email", "Role", "Assessment", "Actions"]}
        data={filtered}
        renderRow={(user) => (
          <tr key={user.id}>
            <td className="px-5 py-4">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-slate-500">{user.company}</p>
              </div>
            </td>
            <td className="px-5 py-4">{user.email}</td>
            <td className="px-5 py-4 capitalize">{user.role}</td>
            <td className="px-5 py-4">
              {user.role === "admin"
                ? "Admin account"
                : `${user.assessmentStatus} • ${user.completion}%`}
            </td>
            <td className="px-5 py-4">
              <Button variant="ghost" size="sm" onClick={() => notify(`Viewing ${user.name}`)}>
                View profile
              </Button>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
