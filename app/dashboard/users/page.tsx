import UsersTab from '@/components/dashboard/UsersTab';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <UsersTab />
    </ProtectedRoute>
  );
}
