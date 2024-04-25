import axios from "axios";
import React, { useState, useEffect } from "react";
import List from "./List";
import "./../Employee/Home.css";

import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

export const Update = () => {
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

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    async function getData() {
      try {
        const employeedata = await axios.get(
          `http://localhost:5000/getEmployee/${id}`
        );
        setData({
          employee_id: employeedata.data[0].employee_id,
          first_name: employeedata.data[0].first_name,
          last_name: employeedata.data[0].last_name,
          email: employeedata.data[0].email,
          dob: employeedata.data[0].dob,
          gender: employeedata.data[0].gender,
          designation: employeedata.data[0].designation,
          department: employeedata.data[0].department,
          salary: employeedata.data[0].salary,
          address: employeedata.data[0].address,
        });
        console.log(employeedata.data);
      } catch (error) {
        console.log("Something went wrong");
      }
    }
    getData();
  }, [id]);

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
          const response = await axios.put(
            `http://localhost:5000/UpdateEmployee/${id}`,
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

  if (status) {
    return <Update />;
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

  const handleOptionChange = (e) => {
    setData({ ...employeedata, gender: e.target.value });
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
          <h4>Update Employee</h4>
          <form onSubmit={onFormSubmit}>
            <div className="form-group">
              <label htmlFor="employee_id">EmployeeID:</label>
              <input
                type="number"
                id="employee_id"
                name="employee_id"
                readOnly
                value={employeedata.employee_id}
                required
              />
            </div>

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
                value={employeedata.dob.substring(0, 10)}
                onChange={onTextFieldChange}
                required
              />
            </div>

            <label>
              <input
                type="radio"
                value="Male"
                checked={employeedata.gender === 0}
                onChange={handleOptionChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={employeedata.gender === 1}
                onChange={handleOptionChange}
              />
              Female
            </label>

            {/* <p>Selected option: {employeedata.gender}</p> */}

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
                <option value="HR">HR</option>
                <option value="Accounts">Accounts</option>
                <option value="Sales">Sales</option>
                <option value="Development">Development</option>
                <option value="QA">QA</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
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
              <button type="submit">Update</button>
              <button onClick={handleClick}>Back </button>
            </div>
          </form>
        </div>
        <div className="list">{/* <List /> */}</div>
      </div>
    </>
  );
};

export default Update;
