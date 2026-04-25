import {
  ClipboardList,
  FileText,
  Home,
  Shield,
  Users,
  UserCircle2,
} from "lucide-react";

export const userNav = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Assessment", to: "/assessment", icon: ClipboardList },
  { label: "Report", to: "/report", icon: FileText },
  { label: "Profile", to: "/profile", icon: UserCircle2 },
];

export const adminNav = [
  { label: "Admin Dashboard", to: "/admin", icon: Shield },
  { label: "Questions", to: "/admin/questions", icon: ClipboardList },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Responses", to: "/admin/responses", icon: FileText },
];
