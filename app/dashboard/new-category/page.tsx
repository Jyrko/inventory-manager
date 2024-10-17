import AddCategoryTab from '@/components/dashboard/AddCategoryTab';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function NewProductPage() {
  return (
    <ProtectedRoute>
      <AddCategoryTab />
    </ProtectedRoute>
  );
}
