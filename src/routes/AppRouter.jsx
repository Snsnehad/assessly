import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import PublicLayout from "../layouts/PublicLayout";
import { adminNav, userNav } from "../data/navigation";
import ProtectedRoute from "./ProtectedRoute";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));
const AssessmentPage = lazy(() => import("../pages/user/QuestionnairePage"));
const ProfilePage = lazy(() => import("../pages/user/ProfilePage"));
const AdminDashboardPage = lazy(() => import("../pages/admin/AdminDashboardPage"));
const ManageQuestionsPage = lazy(() => import("../pages/admin/ManageQuestionsPage"));
const UsersManagementPage = lazy(() => import("../pages/admin/UsersManagementPage"));
const ResponsesPage = lazy(() => import("../pages/admin/ResponsesPage"));

export default function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
        </div>
      }
    >
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoute role="user" />}>
          <Route
            element={
              <AppLayout
                navItems={userNav}
                title="Assessment Workspace"
                subtitle="Continue your written assessment"
                brand="Assessly"
              />
            }
          >
            <Route path="/dashboard" element={<Navigate to="/assessment" replace />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/report" element={<Navigate to="/assessment" replace />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route
            element={
              <AppLayout
                navItems={adminNav}
                title="Admin Console"
                subtitle="Manage the single assessment experience"
                brand="Assessly Admin"
              />
            }
          >
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/questions" element={<ManageQuestionsPage />} />
            <Route path="/admin/users" element={<UsersManagementPage />} />
            <Route path="/admin/responses" element={<ResponsesPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
