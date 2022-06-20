const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;

// Create the connection to database
let connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your Mysql password
    password: 'snookiebaby111',
    database: 'employeeDb'
});

connection.connect(function(err) {
    if (err) throw err;
    beginApp();
});

// Function to begin the app & load the questions
function beginApp() {
inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Remove an employee",
        "Update an employee role",
        "Update an employee manager",
        "QUIT"
    ]
  })
.then(function(answer) {
    switch (answer.action) {
    case "View all Employees":
      viewEmployees();
      break;
    
    case "View All Employees by Department":
      viewEmployeesByDept();
      break;

    case "View Departments":
      deptView();
      break;

    case "Update Employee Manager":
      updateEmployeeMang();
      break;

    case "Update Employee Role":
      updateEmployeeRole();
      break;

    case "View Roles":
      viewRoles();
      break;
      
    case "Delete Employee":
      deleteEmployee();
      break;

    case "Add Employee":
      addEmployee();
      break;

    case "Add Department":
      addDept();
      break;

    case "Add Role":
      roleAdd();
      break;

    case "QUIT":
      console.log("Thank You for using Employee Tracker!")
      process.exit();
    }
  });
}

// View all Employees Function
function viewEmployees() {
    var query = `SELECT employees.id, employees.first_name, employees.last_name, role.title, departments.name AS department, role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN role on employees.role_id = role.id
    LEFT JOIN departments on role.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;`;
    connection.query(query, function(err, query){
        console.table(query);
        beginApp();
    });
};

function employeesByDept() {

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
