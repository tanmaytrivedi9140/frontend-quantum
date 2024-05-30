import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";
import dummyData from "./dummy";
const dummyProfilePicUrl = "https://via.placeholder.com/50";
const DummyApiComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Calculate the index of the last item of the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item of the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to be displayed
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  const getStatusColor = (status) => {
    return status === "Active" ? "text-success" : "text-warning";
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Users</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Created</th>
            <th>Role</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={dummyProfilePicUrl}
                    alt="Profile"
                    className="mr-2 rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td>{item.dateCreated}</td>
              <td>{item.role}</td>
              <td>{item.action}</td>
              <td>
                <span className={getStatusColor(item.status)}>
                  {item.status === "Active" ? (
                    <span className="mr-1">&#8226;</span> // Green dot
                  ) : (
                    <span className="mr-1">&#8226;</span> // Yellow dot
                  )}
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination>
        {Array.from({ length: Math.ceil(dummyData.length / itemsPerPage) }).map(
          (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
};

export default DummyApiComponent;
