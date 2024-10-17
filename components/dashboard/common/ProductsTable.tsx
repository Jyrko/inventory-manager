"use client";
import React, { useState } from "react";
import { Table, Pagination, TextInput, Select, Button, Modal } from "flowbite-react";
import { useForm } from "react-hook-form";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  amount: number;
  addedDate: string;
  lastUpdated: string;
}

interface ProductsTableProps {
  productsInitial: Product[];
}

export default function ProductsTable ({ productsInitial }: ProductsTableProps) {
  const [products, setProducts] = useState<Product[]>(productsInitial);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState<number | null>(null);
  const [filterDateFrom, setFilterDateFrom] = useState("");
  const [filterDateTo, setFilterDateTo] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, 
    // setProductToEdit
  ] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { register, handleSubmit, reset } = useForm();
  

  const handleDeleteConfirmation = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        const response = await fetch(`/api/products/${productToDelete.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== productToDelete.id));
        }
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };
  

  // const handleEditConfirmation = (product: Product) => {
  //   setProductToEdit(product);
  //   setIsEditModalOpen(true);
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditSubmit = async (data: any) => {
    console.log(data); 
    if (productToEdit) {
      try {
        const response = await fetch(`/api/products/${productToEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            lastUpdated: new Date().toISOString(),
          }),
        });
        if (response.ok) {
          const updatedProduct = await response.json();
          const updatedProducts = products.map((product) =>
            product.id === productToEdit?.id ? updatedProduct : product
          );
          setProducts(updatedProducts);
        }
        setIsEditModalOpen(false);
        reset();
      } catch (error) {
        console.error('Failed to update product', error);
      }
    }
  };
  

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      filterCategory ? product.category === filterCategory : true
    )
    .filter((product) =>
      filterPrice ? product.price <= filterPrice : true
    )
    .filter((product) => {
      const addedDate = new Date(product.addedDate);
      const fromDate = filterDateFrom ? new Date(filterDateFrom) : null;
      const toDate = filterDateTo ? new Date(filterDateTo) : null;
      if (fromDate && addedDate < fromDate) return false;
      if (toDate && addedDate > toDate) return false;
      return true;
    });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <TextInput
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
        <Select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full md:w-1/3"
        >
          <option value="">Select a Category</option>
          <option value="4">Laptops</option>
          <option value="5">Accessories</option>
          <option value="6">Phones</option>
          <option value="7">Wearables</option>
          <option value="8">Smart Home</option>
          <option value="9">Tablets</option>
        </Select>
        <TextInput
          type="number"
          placeholder="Max price"
          value={filterPrice !== null ? filterPrice : ""}
          onChange={(e) => setFilterPrice(Number(e.target.value))}
          className="w-full md:w-1/3"
        />
        <TextInput
          type="date"
          value={filterDateFrom}
          onChange={(e) => setFilterDateFrom(e.target.value)}
          className="w-full md:w-1/3"
        />
        <TextInput
          type="date"
          value={filterDateTo}
          onChange={(e) => setFilterDateTo(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      {/* Products Table */}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Amount</Table.HeadCell>
          <Table.HeadCell>Added Date</Table.HeadCell>
          <Table.HeadCell>Last Updated</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <Table.Row key={product.id} className="bg-white dark:bg-gray-800">
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>${product.price}</Table.Cell>
                <Table.Cell>{product.amount}</Table.Cell>
                <Table.Cell>{new Date(product.addedDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{new Date(product.lastUpdated).toLocaleDateString()}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  {/* <Button size="xs" color="info" onClick={() => handleEditConfirmation(product)}>
                    Edit
                  </Button> */}
                  <Button
                    size="xs"
                    color="failure"
                    className="ml-2"
                    onClick={() => handleDeleteConfirmation(product)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={8} className="text-center">No products found</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={isDeleteModalOpen}
        size="md"
        popup
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>Yes, Delete</Button>
              <Button color="gray" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      {productToEdit && (
        <Modal
          show={isEditModalOpen}
          size="lg"
          popup
          onClose={() => setIsEditModalOpen(false)}
        >
          <Modal.Header>Edit Product</Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit(handleEditSubmit)}>
              <div className="space-y-4">
                <TextInput
                  defaultValue={productToEdit.name}
                  {...register("name")}
                />
                <TextInput
                  type="number"
                  defaultValue={productToEdit.price}
                  {...register("price")}
                />
                <TextInput
                  type="number"
                  defaultValue={productToEdit.amount}
                  {...register("amount")}
                />
                <Select
                  defaultValue={productToEdit.category}
                  {...register("category")}
                >
                  <option value="Laptop">Laptop</option>
                  <option value="Phone">Phone</option>
                  <option value="Wearable">Wearable</option>
                  <option value="Accessories">Accessories</option>
                </Select>
                <Button type="submit" className="w-full">Save Changes</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
