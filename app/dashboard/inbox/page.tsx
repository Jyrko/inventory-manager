import InboxTab from '@/components/dashboard/InboxTab';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function InboxPage() {
  return (
    <ProtectedRoute>
      <InboxTab />
    </ProtectedRoute>
  );
}
