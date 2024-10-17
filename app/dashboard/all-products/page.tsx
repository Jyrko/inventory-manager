import ProductsTab from '@/components/dashboard/ProductsTab';
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AllProductsPage() {
  return (
    <ProtectedRoute>
      <ProductsTab />
    </ProtectedRoute>
  );
}
