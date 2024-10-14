"use client";
import React from "react";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import EditableTable from "@/components/dashboard/common/EditableTable";
import { MOCK_DATA_TABLE } from "@/constants/contants";

function DashboardTab() {
  const columns = [
    { label: "Product name", accessor: "name" },
    { label: "Color", accessor: "color" },
    { label: "Category", accessor: "category" },
    { label: "Price", accessor: "price" },
  ];

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

  const handleEditSubmit = (updatedItem) => {
    console.log("Edited item:", updatedItem);
  };

  return (
    <SidebarLayout>
      <h2 className="mb-5">Dashhboard</h2>
      <h2 className="mt-10">Products</h2>
      <EditableTable
        data={MOCK_DATA_TABLE}
        columns={columns}
        filters={filters}
        itemsPerPage={5}
        onEditSubmit={handleEditSubmit}
      />
      <h2 className="my-4">Spare parts </h2>
      <EditableTable
        data={MOCK_DATA_TABLE}
        columns={columns}
        filters={filters}
        itemsPerPage={5}
        onEditSubmit={handleEditSubmit}
      />
    </SidebarLayout>
  );
}

export default DashboardTab;
