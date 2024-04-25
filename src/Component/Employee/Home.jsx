import axios from "axios";
import React, { useState, useEffect } from "react";
import List from "../pages/List";
import "./../Employee/Home.css";

import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const Home = () => {
  const { id } = useParams();
  const [employeedata, setData] = useState({
    employee_id: 0,
    first_name: "",
    last_name: "",
    email: "",
    dob: "",
    gender: "",
    designation: "",
    department: "",
    salary: 0,
    address: "",
  });
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);

  function onTextFieldChange(e) {
    setData({
      ...employeedata,
      [e.target.name]: e.target.value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        try {
          const response = await axios.post(
            `http://localhost:5000/addemployee`,
            employeedata
          );
          setStatus(true);
          //toast.success("Data Updated Successfully");
          navigate("/");
        } catch (error) {
          toast.error("Something is Wrong");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        navigate("/");
      }
    });
  }

  const handleOptionChange = (e) => {
    setData({ ...employeedata, gender: e.target.value });
  };

  if (status) {
    return <Home />;
  }

  const getdept = (num) => {
    switch (num) {
      case 0:
        return "HR";
      case 1:
        return "Accounts";
      case 2:
        return "Sales";
      case 3:
        return "Development";
      case 4:
        return "QA";
      case 5:
        return "Finance";
      case 6:
        return "Operations";
    }
  };

  return (
    <>
      <div className="heading">
        <h2>React CRUD </h2>
      </div>
      <div className="container">
        <div
          className="add-timesheet"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h4>Add Employee</h4>
          <form onSubmit={onFormSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={employeedata.first_name}
                onChange={onTextFieldChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={employeedata.last_name}
                onChange={onTextFieldChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={employeedata.email}
                onChange={onTextFieldChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">DOB:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={employeedata.dob}
                onChange={onTextFieldChange}
                required
              />
            </div>

            <label>
              <input
                type="radio"
                value="Male"
                checked={employeedata.gender === "Male"}
                onChange={handleOptionChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={employeedata.gender === "Female"}
                onChange={handleOptionChange}
              />
              Femal
            </label>

            <p>Selected option: {employeedata.gender}</p>

            <br></br>
            <div className="form-group">
              <label htmlFor="designation">Designation:</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={employeedata.designation}
                onChange={onTextFieldChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                name="department"
                value={getdept(employeedata.department)}
                onChange={onTextFieldChange}
                required
              >
                <option value="0">HR</option>
                <option value="1">Accounts</option>
                <option value="2">Sales</option>
                <option value="3">Development</option>
                <option value="4">QA</option>
                <option value="5">Finance</option>
                <option value="6">Operations</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="salary">Salary:</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={employeedata.salary}
                onChange={onTextFieldChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={employeedata.address}
                onChange={onTextFieldChange}
                required
              />
            </div>

            <div className="buttons-container">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
        <div className="list">
          <List />
        </div>
      </div>
    </>
  );
};
