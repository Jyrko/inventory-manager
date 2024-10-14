"use client";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import ProductsTable from "@/components/dashboard/common/ProductsTable";

function ProductsTab() {
  const initialProducts = [
    { id: 1, name: "MacBook Pro", price: 2999, category: "Laptop", amount: 10, addedDate: "2023-09-01", lastUpdated: "2023-09-05" },
    { id: 2, name: "iPhone 12", price: 799, category: "Phone", amount: 25, addedDate: "2023-09-10", lastUpdated: "2023-09-12" },
    { id: 3, name: "Apple Watch", price: 399, category: "Wearable", amount: 50, addedDate: "2023-09-15", lastUpdated: "2023-09-18" },
    { id: 4, name: "AirPods Pro", price: 249, category: "Accessories", amount: 40, addedDate: "2023-09-20", lastUpdated: "2023-09-22" },
  ];

  return (
    <SidebarLayout>
      <h2 className="mb-5">Products</h2>
      
      <ProductsTable productsInitial={initialProducts} />
    </SidebarLayout>
  );
}

export default ProductsTab;
