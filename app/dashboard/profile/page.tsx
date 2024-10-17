import ProfileTab from '@/components/dashboard/ProfileTab';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Login() {
  return (
    <ProtectedRoute>
      <ProfileTab />
    </ProtectedRoute>
  );
}
