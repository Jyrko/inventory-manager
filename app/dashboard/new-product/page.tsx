import AddProductTab from '@/components/dashboard/AddProductTab';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <AddProductTab />
    </ProtectedRoute>
  );
}
