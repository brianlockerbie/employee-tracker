// Get the client
const mysql = require('mysql2');
var inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your Mysql password
    password: 'snookiebaby111',
    database: 'test'
  });

inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
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
  