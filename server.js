// Get the client
const mysql = require('mysql2');
var inquirer = require('inquirer');
var consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;

// Create the connection to database
const connection = mysql.createConnection({
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
        "View all Employees",
        "View all Employees by Department",
        "View departments",
        "View roles",
        "Add department",
        "Add role",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "QUIT"
    ]
  })
  .then(function(answer) {
    switch (answer.action) {
    case "View all Employees":
        viewEmployees();
        break;
    }
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
}