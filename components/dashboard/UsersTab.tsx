/* eslint-disable */
"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, Select, TextInput, Label } from "flowbite-react";
import { useForm } from "react-hook-form";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import PaginatedTable from "@/components/dashboard/common/PaginatedTableUsers"; // New reusable component
import Loading from "@/components/dashboard/common/Loading";

function UserManagement() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5; // Number of users per page

  interface User {
    id: number;
    name: string;
    role: string;
    email: string;
    status: string;
    created_at: string;
  }

  const [users, setUsers] = useState<User[]>([]); // Initially empty
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Fetch users from API route
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        console.log(data);
        setUsers(data); // Set the fetched users to the state
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleAddUser = async (data: any) => {
    console.log(data);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const newUser = await response.json();

      // Update the local state with the new user
      setUsers([...users, newUser]);
      setIsAddUserModalOpen(false);
      reset();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Handle opening the "View Details" modal and setting the selected user
  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsViewDetailsModalOpen(true);
  };

  // Handle updating the selected user's details
  const handleUpdateUser = async (updatedData: any) => {
    try {
      const response = await fetch(`/api/users/${selectedUser?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();

      // Update the local users state with the updated user data
      setUsers(
        users.map((user) => (user.id === selectedUser?.id ? updatedUser : user))
      );
      setIsViewDetailsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Open the confirmation modal before deleting a user
  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
  };

  // Handle deleting the user
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`/api/users/${selectedUser?.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the deleted user from the local state
      setUsers(users.filter((user) => user.id !== selectedUser?.id));
      setIsViewDetailsModalOpen(false);
      setIsDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Pagination logic
  // const paginatedUsers = users.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  return (
    <SidebarLayout>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-5">
        Users
      </h2>
      <section className="bg-white py-8 dark:bg-gray-900">
        <div className="mx-auto px-4 2xl:px-0">
          <div className="mx-auto">
            <div className="gap-4 lg:flex lg:items-center lg:justify-between mb-4">
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

            {/* Paginated Table Component */}
            {loading ? (
              <Loading />
            ) : (
              <PaginatedTable
                users={users}
                handleViewDetails={handleViewDetails}
                currentPage={currentPage}
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            )}
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
                  {/* Name Field */}
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
                        {String(errors.name.message)}
                      </span>
                    )}
                  </div>

                  {/* Role Field */}
                  <div>
                    <Label htmlFor="role" value="Role" />
                    <Select
                      id="role"
                      {...register("role", { required: "Role is required" })}
                    >
                      <option value="1">User</option>
                      <option value="2">Manager</option>
                      <option value="3">Admin</option>
                    </Select>
                    {errors.role && (
                      <span className="text-red-600">
                        {String(errors.role.message)}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" value="Email" />
                    <TextInput
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Enter a valid email address",
                        },
                      })}
                      placeholder="Enter user email"
                      color={errors.email ? "failure" : "gray"}
                    />
                    {errors.email && (
                      <span className="text-red-600">
                        {String(errors.email.message)}
                      </span>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-4">
                    <Label htmlFor="password" value="Password" />
                    <TextInput
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      })}
                      placeholder="Enter user password"
                      color={errors.password ? "failure" : "gray"}
                    />
                    {errors.password && (
                      <span className="text-red-600">
                        {String(errors.password.message)}
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
                          {String(errors.name.message)}
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
                        <option value="1">User</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </Select>
                      {errors.role && (
                        <span className="text-red-600">
                          {String(errors.role.message)}
                        </span>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="status" value="Status" />
                      <Select
                        id="status"
                        defaultValue={selectedUser.status}
                        {...register("status", {
                          required: "Status is required",
                        })}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                      </Select>
                      {errors.status && (
                        <span className="text-red-600">
                          {String(errors.status.message)}
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
                      <Button color="failure" onClick={openDeleteConfirmation}>
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
              <p>
                Are you sure you want to delete user "{selectedUser?.name}"?
                This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-2 mt-4">
                <Button
                  color="gray"
                  onClick={() => setIsDeleteConfirmationOpen(false)}
                >
                  Cancel
                </Button>
                <Button color="failure" onClick={handleDeleteUser}>
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
