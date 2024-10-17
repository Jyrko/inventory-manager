/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Table, Pagination, TextInput, Select, 
  // Modal, Button 
} from "flowbite-react";

interface EditableTableProps {
  data: any[];
  columns: { label: string; accessor: string }[];
  filters?: { name: string; placeholder: string; options: { value: string; label: string }[] }[];
  itemsPerPage?: number;
  onEditSubmit?: (item: any) => void;
}

function EditableTable({
  data,
  columns,
  filters = [],
  itemsPerPage = 5,
  // onEditSubmit,
}: EditableTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [items, 
    // setItems
  ] = useState(data);
  // const [editItem, setEditItem] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle search and filter logic
  const filteredData = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = filters.every((filter) => {
      const filterValue = filterValues[filter.name];
      return filterValue ? item[filter.name] === filterValue : true;
    });
    return matchesSearch && matchesFilters;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
  };

  // const openEditModal = (item) => {
  //   setEditItem(item); // Set the item to edit
  //   setIsModalOpen(true); // Open the modal
  // };

  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditItem((prevItem) => ({
  //     ...prevItem,
  //     [name]: value,
  //   }));
  // };

  // const handleEditSubmit = () => {
  //   setItems((prevItems) =>
  //     prevItems.map((item) => (item.id === editItem.id ? editItem : item))
  //   );
  //   onEditSubmit && onEditSubmit(editItem); // Optional callback for parent
  //   setIsModalOpen(false); // Close the modal
  // };

  return (
    <div>
      {/* Filters */}
      <div className="flex mt-4 mb-4 gap-4">
        <TextInput
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2"
        />

        {filters.map((filter) => (
          <Select
            key={filter.name}
            value={filterValues[filter.name] || ""}
            onChange={(e) =>
              setFilterValues({ ...filterValues, [filter.name]: e.target.value })
            }
            className="w-full md:w-1/2"
          >
            <option value="">{filter.placeholder}</option>
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table striped className="">
          <Table.Head>
            {columns.map((col) => (
              <Table.HeadCell key={col.accessor}>{col.label}</Table.HeadCell>
            ))}
            {/* <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell> */}
          </Table.Head>
          <Table.Body className="divide-y">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  {columns.map((col) => (
                    <Table.Cell key={col.accessor}>{item[col.accessor]}</Table.Cell>
                  ))}
                  {/* <Table.Cell>
                    <a
                      href="#"
                      onClick={() => openEditModal(item)}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Edit
                    </a>
                  </Table.Cell> */}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={columns.length + 1} className="text-center py-4">
                  No matching products found.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center md:justify-end mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Edit Modal */}
      {/* {editItem && (
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Header>Edit Item</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              {columns.map((col) => (
                <TextInput
                  key={col.accessor}
                  label={col.label}
                  name={col.accessor}
                  value={editItem[col.accessor]}
                  onChange={handleEditChange}
                />
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleEditSubmit}>Save</Button>
            <Button color="gray" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )} */}
    </div>
  );
}

export default EditableTable;
