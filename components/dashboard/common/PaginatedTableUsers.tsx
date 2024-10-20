/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Table, Pagination, Button } from "flowbite-react";

interface PaginatedTableProps {
  users: any[];
  handleViewDetails: (user: any) => void;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const roleIdToRole = (roleId: number) => {
  switch (roleId) {
    case 1: 
      return "User";
    case 2:
      return "Manager";
    case 3:
      return "Admin";
    default:
      return "Unknown";
  }
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({ users, handleViewDetails, currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      {/* Table */}
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Date Registered</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user) => (
            <Table.Row
              key={user.id}
              className="bg-white dark:bg-gray-800"
            >
              <Table.Cell>{`#${user.id}`}</Table.Cell>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{roleIdToRole(user.role)}</Table.Cell>
              <Table.Cell>
                {user.email}
                {/* <span
                  className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}
                >
                  {user.status === "active" ? "Active" : "Pending"}
                </span> */}
              </Table.Cell>
              <Table.Cell>{user.created_at}</Table.Cell>
              <Table.Cell>
                <Button size="xs" outline color="info" onClick={() => handleViewDetails(user)}>
                  View Details
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default PaginatedTable;
