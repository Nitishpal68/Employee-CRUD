import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./View.css"; // Import your CSS file

export const View = () => {
  const { id } = useParams();
  const [employeedata, setData] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    async function getData() {
      try {
        const employeedata = await axios.get(
          `http://localhost:5000/getEmployee/${id}`
        );
        console.log(employeedata.data);
        setData(employeedata.data);
      } catch (error) {
        console.log("Something went wrong");
      }
    }
    getData();
  }, [id]);

  return (
    <>
      <div className="header">
        <h4>Timesheet Details</h4>
      </div>
      <div className="table-container">
        <table className="timesheet-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Salary</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {employeedata.map((employee) => {
              return (
                <tr>
                  <td>{employee.employee_id}</td>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.dob}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                  <td>{employee.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="back-button">
        <button onClick={handleClick}>Back to Home</button>
      </div>
    </>
  );
};
