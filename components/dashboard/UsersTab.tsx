"use client";
import React, { useState } from "react";
import { Button, Modal, Table, Select, TextInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import SidebarLayout from "@/components/layouts/SidebarLayout";

function UserManagement() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      role: "admin",
      status: "active",
      date: "12 April 2024",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "manager",
      status: "pending",
      date: "06 April 2024",
    },
    {
      id: 3,
      name: "Sam Green",
      role: "user",
      status: "active",
      date: "22 May 2024",
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle adding a new user
  const handleAddUser = (data) => {
    setUsers([...users, { id: users.length + 1, ...data, status: "pending" }]);
    setIsAddUserModalOpen(false);
    reset();
  };

  // Handle opening the "View Details" modal and setting the selected user
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsViewDetailsModalOpen(true);
  };

  // Handle updating the selected user's details
  const handleUpdateUser = (updatedData) => {
    setUsers(users.map((user) => (user.id === selectedUser.id ? updatedData : user)));
    setIsViewDetailsModalOpen(false);
  };

  // Open the confirmation modal before deleting a user
  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
  };

  // Handle deleting the user
  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setIsViewDetailsModalOpen(false);
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <SidebarLayout>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-5">
        Users
      </h2>
      <section className="bg-white py-8 dark:bg-gray-900">
        <div className="mx-auto px-4 2xl:px-0">
          <div className="mx-auto">
            <div className="gap-4 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                User Management
              </h2>

              <div className="mt-6 gap-4 sm:flex sm:items-center lg:mt-0 lg:justify-end">
                <Button
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="bg-primary-700 hover:bg-primary-800 text-white"
                >
                  Add New User
                </Button>
              </div>
            </div>

            {/* User Table */}
            <div className="mt-6 flow-root sm:mt-8">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>User ID</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Role</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
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
                      <Table.Cell>{user.role}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {user.status === "active" ? "Active" : "Pending"}
                        </span>
                      </Table.Cell>
                      <Table.Cell>{user.date}</Table.Cell>
                      <Table.Cell>
                        <Button
                          size="xs"
                          outline
                          color="info"
                          onClick={() => handleViewDetails(user)}
                        >
                          View Details
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>

          {/* Add User Modal */}
          <Modal
            show={isAddUserModalOpen}
            onClose={() => setIsAddUserModalOpen(false)}
          >
            <Modal.Header>Add New User</Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit(handleAddUser)}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" value="Name" />
                    <TextInput
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter user name"
                      color={errors.name ? "failure" : "gray"}
                    />
                    {errors.name && (
                      <span className="text-red-600">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="role" value="Role" />
                    <Select
                      id="role"
                      {...register("role", { required: "Role is required" })}
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="user">User</option>
                    </Select>
                    {errors.role && (
                      <span className="text-red-600">
                        {errors.role.message}
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="bg-primary-700 hover:bg-primary-800 text-white"
                  >
                    Add User
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>

          {/* View/Edit User Modal */}
          {selectedUser && (
            <Modal
              show={isViewDetailsModalOpen}
              onClose={() => setIsViewDetailsModalOpen(false)}
            >
              <Modal.Header>View/Edit User</Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={handleSubmit((data) =>
                    handleUpdateUser({ ...selectedUser, ...data })
                  )}
                >
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" value="Name" />
                      <TextInput
                        id="name"
                        defaultValue={selectedUser.name}
                        {...register("name", { required: "Name is required" })}
                        placeholder="Enter user name"
                      />
                      {errors.name && (
                        <span className="text-red-600">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="role" value="Role" />
                      <Select
                        id="role"
                        defaultValue={selectedUser.role}
                        {...register("role", { required: "Role is required" })}
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                      </Select>
                      {errors.role && (
                        <span className="text-red-600">
                          {errors.role.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="status" value="Status" />
                      <Select
                        id="status"
                        defaultValue={selectedUser.status}
                        {...register("status", { required: "Status is required" })}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                      </Select>
                      {errors.status && (
                        <span className="text-red-600">
                          {errors.status.message}
                        </span>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <Button
                        type="submit"
                        className="bg-primary-700 hover:bg-primary-800 text-white"
                      >
                        Save Changes
                      </Button>
                      <Button
                        color="failure"
                        onClick={openDeleteConfirmation}
                      >
                        Delete User
                      </Button>
                    </div>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            show={isDeleteConfirmationOpen}
            onClose={() => setIsDeleteConfirmationOpen(false)}
          >
            <Modal.Header>Confirm Deletion</Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete user "{selectedUser?.name}"? This action cannot be undone.</p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  color="gray"
                  onClick={() => setIsDeleteConfirmationOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="failure"
                  onClick={handleDeleteUser}
                >
                  Delete
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </section>
    </SidebarLayout>
  );
}

export default UserManagement;
