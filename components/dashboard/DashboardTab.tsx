"use client";
import React, { useEffect, useState } from "react";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import EditableTable from "@/components/dashboard/common/EditableTable";
import Loading from "@/components/dashboard/common/Loading";

function DashboardTab() {
  const [regularProducts, setRegularProducts] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await fetch("/api/products");
        const productsData = await productsResponse.json();
        
        setRegularProducts(productsData.regularProducts);
        setSpareParts(productsData.spareParts);
        setLoading(false); // Data is loaded, stop loading
      } catch (error) {
        console.error("Error fetching products and categories", error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProductsAndCategories();
  }, []);

  const filters = [
    {
      name: "category",
      placeholder: "All Categories",
      options: [
        { value: "Laptop", label: "Laptop" },
        { value: "Laptop PC", label: "Laptop PC" },
        { value: "Accessories", label: "Accessories" },
        { value: "Phone", label: "Phone" },
        { value: "Wearables", label: "Wearables" },
      ],
    },
  ];

  const columns = [
    { label: "Product name", accessor: "name" },
    { label: "Brand", accessor: "brand" },
    { label: "Current stock", accessor: "amount_in_stock" },
    { label: "Category", accessor: "category_id" },
    { label: "Price", accessor: "price" },
  ];

  const handleEditSubmit = (updatedItem: any) => {
    console.log("Edited item:", updatedItem);
  };

  return (
    <SidebarLayout>
      <h2 className="mb-5">Dashboard</h2>

      {loading ? (
        // Show loading state while data is being fetched
        <Loading />
      ) : (
        <>
          {/* Products Table */}
          <h2 className="mt-10">Products</h2>
          {regularProducts.length === 0 ? (
            <p>No regular products found</p>
          ) : (
            <EditableTable
              data={regularProducts}
              columns={columns}
              filters={filters}
              itemsPerPage={5}
              onEditSubmit={handleEditSubmit}
            />
          )}

          {/* Spare Parts Table */}
          <h2 className="my-4">Spare parts</h2>
          {spareParts.length === 0 ? (
            <p>No spare parts found</p>
          ) : (
            <EditableTable
              data={spareParts}
              columns={columns}
              filters={filters}
              itemsPerPage={5}
              onEditSubmit={handleEditSubmit}
            />
          )}
        </>
      )}
    </SidebarLayout>
  );
}

export default DashboardTab;
