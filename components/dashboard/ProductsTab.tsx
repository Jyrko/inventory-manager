"use client";

import { useState, useEffect } from "react";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import ProductsTable from "@/components/dashboard/common/ProductsTable";
import Loading from "@/components/dashboard/common/Loading";

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: string;
  amount_in_stock: number;
  created_at: string;
}

export default function ProductsTab() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/all-products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        console.log(data);
        const formattedProducts = data.map((product: Product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category_id ?? "Unknown",
          amount: product.amount_in_stock,
          addedDate: product.created_at?.split("T")[0],
          lastUpdated: product.created_at?.split("T")[0],
        }));
        setProducts(formattedProducts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <SidebarLayout>
        <Loading />
      </SidebarLayout>
    );
  }

  if (error) {
    return (
      <SidebarLayout>
        <p>Error loading products: {error}</p>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <h2 className="mb-5">Products</h2>
      <ProductsTable productsInitial={products} />
    </SidebarLayout>
  );
}
