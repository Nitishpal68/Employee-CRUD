using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Employee_Crud.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Employee_Crud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeCRUDController : ControllerBase
    {
        public static List<Employee> employeeList = new List<Employee>();

        [Route("/getEmployee")]
        public IActionResult GetAllEmployees()
        {

            try
            {              
                using (var connection = new SqlConnection(ConfigurationSettings.AppSettings["dbconn"].ToString()))
                {
                    connection.Open();
                    employeeList.Clear();
                    using (var command = new SqlCommand("manage_emp", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@action", "SELECTALL");

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Employee employee = new Employee
                                {
                                    employee_id = Convert.ToInt32(reader["employee_id"]),
                                    first_name = reader["first_name"].ToString(),
                                    last_name = reader["last_name"].ToString(),
                                    email = reader["email"].ToString(),
                                    dob = Convert.ToDateTime(reader["dob"]),
                                    gender = reader["gender"] == DBNull.Value ? Employee.genders.Male : (Employee.genders)Enum.Parse(typeof(Employee.genders), reader["gender"].ToString()),
                                    designation = reader["designation"].ToString(),
                                    department = reader["department"] == DBNull.Value ? Employee.departments.HR : (Employee.departments)Enum.Parse(typeof(Employee.departments), reader["department"].ToString()),
                                    salary = Convert.ToDecimal(reader["salary"]),
                                    address = reader["address"].ToString()
                                };
                                employeeList.Add(employee);
                            }
                        }
                    }
                }

                return Ok(employeeList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Route("/addemployee")]
        [HttpPost]
        [Obsolete]
        public ActionResult AddEmployees([FromBody] Employee employee)
        {         
                using (var connection = new SqlConnection(ConfigurationSettings.AppSettings["dbconn"].ToString()))
                {
                     connection.Open();
                    using (var command = new SqlCommand("manage_emp", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@action", "I");
                        command.Parameters.AddWithValue("@firstname", employee.first_name);
                        command.Parameters.AddWithValue("@lastname", employee.last_name);
                        command.Parameters.AddWithValue("@email", employee.email);
                        command.Parameters.AddWithValue("@dob", employee.dob);
                        command.Parameters.AddWithValue("@gender", employee.gender.ToString());
                        command.Parameters.AddWithValue("@designation", employee.designation);
                        command.Parameters.AddWithValue("@department", employee.department.ToString());
                        command.Parameters.AddWithValue("@salary", employee.salary);                     
                        command.Parameters.AddWithValue("@address", employee.address);
                         command.ExecuteNonQuery();
                    }
                }
                return Ok(new { message = "Employee Added" });
            }           
       
        [Route("/updateEmployee/{employee_id}")]
        [HttpPut]
        public ActionResult UpdateEmployee(int employee_id, [FromBody] Employee employee)
        {
           
            try
                {
                                  
                    using (var connection = new SqlConnection(ConfigurationSettings.AppSettings["dbconn"].ToString()))
                    {
                        connection.Open();
                        using (var command = new SqlCommand("manage_emp", connection))
                        {
                            command.CommandType = CommandType.StoredProcedure;
                            command.Parameters.AddWithValue("@action", "U");
                            command.Parameters.AddWithValue("@employee_id", employee_id);
                            command.Parameters.AddWithValue("@firstname", employee.first_name);
                            command.Parameters.AddWithValue("@lastname", employee.last_name);
                            command.Parameters.AddWithValue("@email", employee.email);
                        if (employee.dob == Convert.ToDateTime("01-01-0001 00:00:00"))
                        {
                            command.Parameters.AddWithValue("@dob", DBNull.Value);
                        }
                        else
                        {
                            command.Parameters.AddWithValue("@dob", employee.dob);
                        }
                        command.Parameters.AddWithValue("@gender", employee.gender.ToString());
                            command.Parameters.AddWithValue("@designation", employee.designation);
                            command.Parameters.AddWithValue("@department", employee.department.ToString());
                        if (employee.salary == 0)
                        {
                            command.Parameters.AddWithValue("@salary", DBNull.Value);
                        }
                        else
                        {
                            command.Parameters.AddWithValue("@salary", employee.salary);
                        }
                        command.Parameters.AddWithValue("@address", employee.address);                          

                            command.ExecuteNonQuery();
                        }
                    }

                    return Ok("Updated Successfully");
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"An error occurred: {ex.Message}");
                }                      
        }

        [Route("/deleteEmployee/{employee_id}")]
        [HttpDelete]
        public ActionResult DeleteEmployee(int employee_id)
        {
            try
            {
                using (var connection = new SqlConnection(ConfigurationSettings.AppSettings["dbconn"].ToString()))
                {
                    connection.Open();
                    using (var command = new SqlCommand("manage_emp", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@action", "D");
                        command.Parameters.AddWithValue("@employee_id", employee_id);

                        command.ExecuteNonQuery();
                    }
                }

                return Ok("Deleted Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [Route("/getEmployee/{employee_id}")]
        public IActionResult GetAllEmployees(int employee_id)
        {
            try
            {
                using (var connection = new SqlConnection(ConfigurationSettings.AppSettings["dbconn"].ToString()))
                {
                    connection.Open();
                    employeeList.Clear();
                    using (var command = new SqlCommand("manage_emp", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@action", "S");
                        command.Parameters.AddWithValue("@employee_id", employee_id);
                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Employee employee = new Employee
                                {
                                    employee_id = Convert.ToInt32(reader["employee_id"]),
                                    first_name = reader["first_name"].ToString(),
                                    last_name = reader["last_name"].ToString(),
                                    dob = Convert.ToDateTime(reader["dob"]),
                                    email = reader["email"].ToString(),
                                    gender = reader["gender"] == DBNull.Value ? Employee.genders.Male : (Employee.genders)Enum.Parse(typeof(Employee.genders), reader["gender"].ToString()),
                                    designation = reader["designation"].ToString(),
                                    department = reader["department"] == DBNull.Value ? Employee.departments.HR : (Employee.departments)Enum.Parse(typeof(Employee.departments), reader["department"].ToString()),
                                    salary = Convert.ToDecimal(reader["salary"]),
                                    address = reader["address"].ToString()
                                };
                                employeeList.Add(employee);
                            }
                        }
                    }
                }

                return Ok(employeeList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}