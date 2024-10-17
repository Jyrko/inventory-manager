import Dashboard from '@/components/dashboard/DashboardTab';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Login() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
