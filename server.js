const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');



const connection = mysql.createConnection({
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your Mysql password
    password: "snookiebaby111",
    // Create the connection to database
    database: "employeesDb"
});

   
   connection.connect(function(err) {
    if (err) throw err;
    beginApp();
});

// Function to begin the app & load the questions
function beginApp() {
inquirer
  .prompt({
    name: "toDo",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View all departments",
        "View all employees",
        "View all employees by department",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Remove an employee",
        "Update an employee role",
        "Update an employee manager",
        "Quit session"
    ]
  })
.then(function(answer) {
    switch (answer.toDo) {
    case "View all departments":
      viewDepartments();
      break;

    case "View all employees":
      viewEmployees();
      break;

    case "View all employees by department":
      viewEmployeeByDepartment();
      break;

    case "Add a role":
      addRole();
      break;

    case "Add an employee":
      addEmployee();
      break;
      
    case "Remove an employee":
      removeEmployee();
      break;

    case "Update an employee role":
      updateEmployeeRole();
      break;

    case "Update an employee manager":
      updateEmployeeMang();
      break;

    case "Quit session":
      quitSession();
      console.log("Thank You for using Employee Tracker!")
      break;
    }
  });
}

// View all Employees Function
function viewDepartments() {
  connection.query("Select id, department_name, the_budget FROM department", function (err, res) {
    if (err) throw err;
    console.table("Departments", res);
    beginApp()
  })
}

function viewEmployees() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.department.name, employee.salary, role.title, manager_name";
    query += "FROM employee";
    query += "INNER JOIN department ON employee.employee_department = department.department_name";
    query += "INNER JOIN role ON department.id = role.department_id";
    query += "LEFT JOIN manager ON employee.manager_id = manager.id";

    connection.query(query, function (err, res) {
        console.table("All Employees", res);
        beginApp()
    })
}

function viewEmployeeByDepartment() {
  let query = "SELECT department.department_name, employee.id, employee.first_name, employee.last_name ";
  query += "FROM department ";
  query += "INNER JOIN employee ON employee.employee_department = department.department_name ";
  query += "ORDER BY department.department_name";

  connection.query(query, function (err, res) {
    console.table("Employees By Manager", res);
    beginApp()
  })
}

function employeesByMang() {

}

function deleteEmployee() {

}

function addEmployee() {

}

function updateEmployeeMang() {

}

function updateEmployeeRole() {

};
