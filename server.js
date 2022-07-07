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
        "Add employee",
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

// View all Employees Departments
function viewDepartments() {
  connection.query("Select id, department_name, the_budget FROM department", function (err, res) {
    if (err) throw err;
    console.table("Departments", res);
    beginApp()
  })
}

function viewEmployees() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, employee.salary, role.title, manager_name ";
    query += "FROM employee ";
    query += "INNER JOIN department ON employee.employee_department = department.department_name ";
    query += "INNER JOIN role ON department.id = role.department_id ";
    query += "LEFT JOIN manager ON employee.manager_id = manager.id ";

    connection.query(query, function (err, res) {
        console.table('All Employees', res);
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
  let query = "SELECT manager.id, manager.manager_name, employee.first_name, employee.last_name ";
  query += "FROM manager ";
  query += "INNER JOIN employee ON manager.id = employee.manager_id ";
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
      message: "What is the first name of the new employee? "
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
      message: "What is the salary of the new employee?"
    },
    {
      name: "newEmployeeManager",
      type: "list",
      message: "Who will be this new employee's Manager?",
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

    var query = connection.query(

      "INSERT INTO employee SET ?",
      {
        first_name: answer.newEmployeeFirstName,
        last_name: answer.newEmpleesLastName,
        employee_department: answer.newEmployeeDepartment,
        salary: answer.newEmployeeSalary,
        role_id: newEmployeeRole,
        manager_id: newEmployeeManager
      },

      function (err, res) {
        if (err);
        console.log(" Employee Added!");
        beginApp()
      }
    )
  })

}

function removeEmployee() {
  let query = "SELECT employee.id, employee.first_name, employee.last_name ";
  query += "FROM employee ";
  connection.query(query, function(err, results) {
    if (err) throw err;
    inquirer
    .prompt([
      {
        name: "option",
        type: "list",
        message: "Please select the employee you would like to remove?",
        choices: function() {
          let optionArray = [];
            for (let i=1; i < results.length; i++) {
            let employ = " ";
            employ = `${results[i].id} ${results[i].first_name} ${results[i].last_name}`
            optionArray.push(employ)
          }
        return optionArray;
        }
      }
    ])
    .then(function(answer) {
      deleteRemovedEmployee(answer);
      return answer;
    })
  })
}

function deleteRemovedEmployee(answer) {
  let choiceStr = answer.option;
  connection.query(
    "DELETE FROM employee WHERE ?",
    [
      {
        id: parseInt(choiceStr[0])
      }
    ],
    function(error, res) {
      if (error) throw error;
      console.log(" You DELETED the Employee!");
    beginApp()
    }
  )
}


function updateEmployeeRole() {
  let query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title ";
  query += "FROM employee ";
  query += "INNER JOIN department ON employee.employee_department = department.department_name ";
  query += "INNER JOIN role on department.id = role.department_id ";

  connection.query(query, function(err, results) {
    if (err) throw err;

    inquirer.prompt([
      {
        name: "option",
        type: "list",
        message: "Select an employees role you would like to update.",
        choices: function() {
          let optionArray = [];
          for (let i=1; i < results.length; i++) {
            let employ = "";
            employ = `${results[i].id} ${results[i].first_name} ${results[i].last_name} ${results[i].department_name} ${results[i].role_id} ${results[i].title}`
            optionArray.push(employ)
          }
        return optionArray;
        }
      },
      {
        name: "roleUpdate",
        type: "list",
        message: "Select role to update this employee's role to.",
        choices: ["Sales Manager", "Lead Engineer", "Account Manager", "Legal Team Lead", "Operations Manager" ]
      }
    ])
    .then(function(answer) {
    updateToSelectedRole(answer);
    return answer;
    })
  })
}

function updateToSelectedRole(answer) {
  newRoleId = "";
  newDepartment = "";
  newManager = "";

  if (answer.roleUpdate === 'Sales President') {
    newRoleId = 2;
    newDepartment = 'Sales';
    newManager = 1;
  }
  if (answer.roleUpdate === 'Full Stack Engineer') {
    newRoleId = 2;
    newDepartment = 'Engineering';
    newManager = 2;
  }
  if (answer.roleUpdate === 'Senior Accountant') {
    newRoleId = 2;
    newDepartment = 'Finance';
    newManager = 3;
  }
  if (answer.roleUpdate === 'Civil Lawyer') {
    newRoleId = 2;
    newDepartment = 'Legal';
    newManager = 4;
  }
  if (answer.roleUpdate === 'Operations CEO') {
    newRoleId = 2;
    newDepartment = 'Operations';
    newManager = 5;
  }

  let choiceStr = answer.option.split(" ")
  console.log(answer);
  console.log(choiceStr[0]);

  connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        role_id: newRoleId,
        employee_department: newDepartment,
        manager_id: newManager
      },
      {
        id: parseInt(choiceStr[0])
      }
    ],
    function(error, res) {
      if (error);
      console.log(" You UPDATED the Employee's Role!");
    beginApp();
    }
  )
}
 
function updateEmployeeManager() {
  let query = "SELECT employee.id, employee.first_name, employee.last_name ";
  query += "FROM employee ";
  connection.query(query, function(err, results) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "option",
        type: "list",
        message: "Please select the employees manager that would like to update.",
        choices: function() {
          let optionArray = [];
          for (let i=1; i < results.length; i++) {
            let employ = " ";
            employ = `${results[i].id} ${results[i].first_name} ${results[i].id} ${results[i].last_name}`
            optionArray.push(employ)
          }
          return optionArray;
        }
      },
      {
        name: "managerUpdate",
        type: "list",
        message: "Please select which manager you would like to assign to this employee",
        choices: ["Matt Leblanc",
        "Ashley Rodriguez",
        "Kunal Singh"]
      }
    ])
    .then(function(answer) {
      updateEmployeeManager(answer);
      return answer;
    })
  })
}


function updateEmployeeManager(answer) {
  newManager = "";

  if (answer.managerUpdate === "Matt Leblanc") {
    newManager = 1;
  }

  if (answer.managerUpdate === "Ashley Rodriguez") {
    newManager = 2;
  }

  if (answer.managerUpdate === "Kunal Singh") {
    newManager = 3;
  }

  if (answer.managerUpdate === "Sarah Lourd") {
    newManager = 4
  }

  if (answer.managerUpdate === "Carly Bell") {
    newManager = 5
  }

  let choiceStr = answer.choice.split(" ");
  
  connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        manager_id: newManager
      },
      {
        id: parseInt(choiceStr[0])
      }
    ],
    function(error, res) {
      if (error) throw error;
      console.log(res.affectedRows + " You UPDATED the Employee's Manager!");
    beginApp();
    }
  )
}

function quitSession() {
  console.log("Quit session.");
  connection.end();
}