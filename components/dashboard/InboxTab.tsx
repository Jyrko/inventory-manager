"use client";
// import SidebarLayout from '@/components/layouts/SidebarLayout';
// import React, { useState } from "react";
// import { Table, Pagination, Select, TextInput } from "flowbite-react";

function InboxTab() {
  // const [logs] = useState([
  //   {
  //     id: 1,
  //     type: "Product Added",
  //     description: "Product 'MacBook Pro' was added",
  //     performedBy: "Admin",
  //     date: "2024-09-10",
  //   },
  //   {
  //     id: 2,
  //     type: "User Added",
  //     description: "User 'John Doe' was added",
  //     performedBy: "Admin",
  //     date: "2024-09-12",
  //   },
  //   {
  //     id: 3,
  //     type: "Product Deleted",
  //     description: "Product 'iPhone 12' was deleted",
  //     performedBy: "Manager",
  //     date: "2024-09-14",
  //   },
  //   {
  //     id: 4,
  //     type: "User Deleted",
  //     description: "User 'Jane Smith' was deleted",
  //     performedBy: "Manager",
  //     date: "2024-09-16",
  //   },
  //   {
  //     id: 5,
  //     type: "Product Updated",
  //     description: "Product 'MacBook Pro' was updated",
  //     performedBy: "Admin",
  //     date: "2024-09-18",
  //   },
  //   {
  //     id: 6,
  //     type: "User Updated",
  //     description: "User 'John Doe' was updated",
  //     performedBy: "Admin",
  //     date: "2024-09-20",
  //   },
  // ]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(5);
  // const [sortType, setSortType] = useState("");
  // const [sortOrder, setSortOrder] = useState("asc");
  // const [searchTerm, setSearchTerm] = useState("");

  // // Filtering logic for search
  // const filteredLogs = logs.filter((log) =>
  //   log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   log.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   log.performedBy.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // // Sorting logic by date or log type
  // const sortedLogs = filteredLogs.sort((a, b) => {
  //   if (sortType === "date") {
  //     return sortOrder === "asc"
  //       ? new Date(a.date) - new Date(b.date)
  //       : new Date(b.date) - new Date(a.date);
  //   } else if (sortType === "logType") {
  //     return sortOrder === "asc"
  //       ? a.type.localeCompare(b.type)
  //       : b.type.localeCompare(a.type);
  //   }
  //   return 0;
  // });

  // // Pagination logic
  // const totalPages = Math.ceil(sortedLogs.length / itemsPerPage);
  // const paginatedLogs = sortedLogs.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  // const handlePageChange = (page) => setCurrentPage(page);

  // const handleSortChange = (e) => {
  //   const [type, order] = e.target.value.split("-");
  //   setSortType(type);
  //   setSortOrder(order);
  // };

  return (
    // <SidebarLayout>
    //   <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
    //     <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
    //       Inbox Logs
    //     </h2>

    //     {/* Search Input */}
    //     <div className="flex gap-4 mb-4">
    //       <TextInput
    //         type="text"
    //         placeholder="Search logs"
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         className="w-full md:w-1/2"
    //       />
    //       <Select
    //         id="sort"
    //         onChange={handleSortChange}
    //         className="w-full md:w-1/2"
    //       >
    //         <option value="">Sort By</option>
    //         <option value="date-asc">Date (Oldest First)</option>
    //         <option value="date-desc">Date (Newest First)</option>
    //         <option value="logType-asc">Log Type (A-Z)</option>
    //         <option value="logType-desc">Log Type (Z-A)</option>
    //       </Select>
    //     </div>

    //     {/* Logs Table */}
    //     <Table hoverable>
    //       <Table.Head>
    //         <Table.HeadCell>Log ID</Table.HeadCell>
    //         <Table.HeadCell>Type</Table.HeadCell>
    //         <Table.HeadCell>Description</Table.HeadCell>
    //         <Table.HeadCell>Performed By</Table.HeadCell>
    //         <Table.HeadCell>Date</Table.HeadCell>
    //       </Table.Head>
    //       <Table.Body className="divide-y">
    //         {paginatedLogs.length > 0 ? (
    //           paginatedLogs.map((log) => (
    //             <Table.Row key={log.id} className="bg-white dark:bg-gray-800">
    //               <Table.Cell>{log.id}</Table.Cell>
    //               <Table.Cell>{log.type}</Table.Cell>
    //               <Table.Cell>{log.description}</Table.Cell>
    //               <Table.Cell>{log.performedBy}</Table.Cell>
    //               <Table.Cell>{new Date(log.date).toLocaleDateString()}</Table.Cell>
    //             </Table.Row>
    //           ))
    //         ) : (
    //           <Table.Row>
    //             <Table.Cell colSpan={5} className="text-center">
    //               No logs available
    //             </Table.Cell>
    //           </Table.Row>
    //         )}
    //       </Table.Body>
    //     </Table>

    //     {/* Pagination */}
    //     <div className="flex justify-center mt-6">
    //       <Pagination
    //         currentPage={currentPage}
    //         totalPages={totalPages}
    //         onPageChange={handlePageChange}
    //       />
    //     </div>
    //   </div>
    // </SidebarLayout>
    <>
    </>
  );
}

export default InboxTab;
