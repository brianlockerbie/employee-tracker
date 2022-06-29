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
        "View all employees by Manager",
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

    case "View all employees by Manager":
      EmployeeByManger();
      break;

    case "Add employee":
      addEmployee();
      break;
      
    case "Remove an employee":
      removeEmployee();
      break;

    case "Update an employee role":
      updateEmployeeRole();
      break;

    case "Update an employee manager":
      updateEmployeeManager();
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

function EmployeeByManger() {
  console.log("View Employee by Manager");
  let query = "SELECT manager.manager_id, manager.manager_name, employee.first_name, employee.last_name ";
  query += "FROM manager ";
  query += "INNER JOIN employee ON manager.manager_id = employee.manager_id ";
  query += "ORDER BY manager.manager_name";

  connection.query(query, function (err, res) {
    console.table("Employees By Manager", res);
    beginApp()
  })
}

function addEmployee() {
  inquirer
  .prompt([
    {
      name: "newEmployeeFirstName",
      type: "input",
      message: "What is the first name of the new employee?"
    },
    {
      name: "newEmployeeLastName",
      type: "input",
      message: "What is the last name of the new employee?"
    },
    {
      name: "newEmployeeDepartment",
      type: "list",
      message: "Which department is the new employee in?",
      choices: [
        "Sales",
        "Engineering",
        "Finance",
        "Legal",
        "Operations"
      ]
    },
    {
      name: "newEmployeeSalary",
      type: "input",
      message: "What is the salart of the new employee?"
    },
    {
      name: "newEmployeeManager",
      type: "list",
      message: "Who will be this new employee's Manager",
      choices: [
        "Matt Leblanc",
        "Ashley Rodriguez",
        "Kunal Singh",
        "Sarah Lourd",
        "Carly Bell"
      ],
    },
    {
      name: "newEmployeeRole",
      type: "list",
      message: "Please select the new employee's role",
      choices: [
        "Salesperson",
        "Software Engineer",
        "Accountant",
        "Lawyer",
        "Operations Associate"
      ]
    }
  ])

  .then(function(answer) {
    var newEmployeeManager = " "

    if (answer.newEmployeeManager === "Matt Leblanc") { 
      newEmployeeManager = 1;
    }

    if (answer.newEmployeeManager === "Ashley Rodriguez") { 
      newEmployeeManager = 3;
    }

    if (answer.newEmployeeManager === "Kevin Tupik") { 
      newEmployeeManager = 2;
    }

    if (answer.newEmployeeManager === "Carly Bell") { 
      newEmployeeManager = 5;
    }

    if (answer.newEmployeeManager === "Tom Allen") { 
      newEmployeeManager = 4;
    }


    var newEmployeeRole = " ";

    if (answer.newEmployeeRole === "Salesperson") { 
      newEmployeeRole = 1;
    }

    if (answer.newEmployeeRole === "Software Engineer") { 
      newEmployeeRole = 2;
    }

    if (answer.newEmployeeRole === "Accountant") { 
      newEmployeeRole = 3;
    }

    if (answer.newEmployeeRole === "Lawyer") { 
      newEmployeeRole = 4;
    }

    if (answer.newEmployeeRole === "Operations Associate") { 
      newEmployeeRole = 5;
    }
  })

}

function deleteEmployee() {
  let query = "SELECT employee.id, employee.first_name,employee.last_mame";
  query += "FROM employee ";

  connection.query(query, function(err, results) {
    if (err) throw err;

  })
}



function updateEmployeeMang() {

}

function updateEmployeeRole() {

};
