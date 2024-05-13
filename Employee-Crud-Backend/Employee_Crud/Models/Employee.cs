using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee_Crud.Models
{
    public class Employee
    {
        public int employee_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public DateTime dob { get; set; }
        public genders gender { get; set; }
        public string designation { get; set; }
        public departments department { get; set; }
        public decimal salary { get; set; }
        public string address { get; set; }

        public enum genders
        {
            Male,
            Female,           
        }
        public enum departments
        {
            HR,
            Accounts,
            Sales,
            Developement,
            QA,
            Finance,
            Operations,           
        }
    }
}
