import {
  ClipboardList,
  FileText,
  Shield,
  Users,
  UserCircle2,
} from "lucide-react";

export const userNav = [
  { label: "Assessment", to: "/assessment", icon: ClipboardList },
  { label: "Profile", to: "/profile", icon: UserCircle2 },
];

export const adminNav = [
  { label: "Admin Dashboard", to: "/admin", icon: Shield },
  { label: "Questions", to: "/admin/questions", icon: ClipboardList },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Responses", to: "/admin/responses", icon: FileText },
];
