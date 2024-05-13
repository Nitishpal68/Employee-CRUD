import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toast } from "react-hot-toast";
import Swal from "sweetalert2";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./List.css";

const List = () => {
  const [employeedata, setData] = useState([]);

  useEffect(() => {
    async function getAllData() {
      try {
        const employeedata = await axios.get(
          "http://localhost:5000/getEmployee"
        );
        console.log(employeedata.data);
        setData(employeedata.data);
      } catch (error) {
        console.log("Something went wrong");
      }
    }
    getAllData();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Data has been deleted.",
          icon: "success",
        });
        try {
          await axios.delete(`http://localhost:5000/deleteEmployee/${id}`);
          const newEmployeeData = employeedata;
          setData(newEmployeeData);
          //toast.success("Data Deleted");
        } catch (error) {
          console.error("Error deleting data:", error);
        }
      }
    });
  };

  return (
    <>
      <div className="header">
        <h4>Employees</h4>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr className="table-header">
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email </th>
              <th>Departments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employeedata.map((emp, i) => (
              <>
                <tr key={i}>
                  <td>{emp.employee_id}</td>
                  <td>{emp.first_name}</td>
                  <td>{emp.last_name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>

                  <td>
                    <Link to={`/view/${emp.employee_id}`}>
                      <span className="tooltip">
                        <i
                          className="fa-regular fa-eye"
                          style={{ color: "#FFD43B" }}
                        ></i>
                        <span className="tooltiptext">Details</span>
                      </span>
                    </Link>

                    <Link to={`/update/${emp.employee_id}`}>
                      <span className="tooltip">
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{ color: "#d41183" }}
                        ></i>
                        <span className="tooltiptext">Update</span>
                      </span>
                    </Link>
                    <a onClick={() => handleDelete(emp.employee_id)}>
                      <span className="tooltip">
                        <i
                          className="fa-solid fa-trash"
                          style={{ color: "#e20808" }}
                        ></i>
                        <span className="tooltiptext">Delete</span>
                      </span>
                    </a>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
