const mysql = require('mysql2');
var inquirer = require('inquirer');
const cTable = require('console.table');



const connection = mysql.createConnection({
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your Mysql password
    password: "snookiebaby111",
    // Create the connection to database
    database: "employees_db"
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
        "View all roles",
        "View all employees",
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
    switch (answer.action) {
    case "View all departments":
      viewDepartments();
      break;
    
    case "View all roles":
      viewRoles();
      break;

    case "View all employees":
      viewEmployees();
      break;

    case "Add a department":
      addDepartment();
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

