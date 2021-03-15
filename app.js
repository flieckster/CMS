const mysql = require('mysql');
const inquirer = require('inquirer');
var functions = require("./functions.js");

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Welcome1',
  database: 'cms_DB',
});


connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  console.log(" __________________________")
  console.log("  #####   #     #   #####  ")
  console.log(" #     #  ##   ##  #     # ")
  console.log(" #        # # # #  #       ")
  console.log(" #        #  #  #   #####  ")
  console.log(" #        #     #        # ")
  console.log(" #     #  #     #  #     # ")
  console.log("  #####   #     #   #####  ")
  console.log(" __________________________")
mainMenu();

})

function mainMenu() {

  inquirer.prompt({

    type: "list",
    message: "What would you like to do?\n\n",
    name: "selection",
    choices:

      [
        "View All Of The Employees",
        "View All Of The Departments",
        "View All Of The Employee Roles",
        "Add A New Department",
        "Add A New Employee Role",
        "Add A New Employee",
        "Update An Employee's Role",
        "Remove An Existing Employee",
        "Remove An Existing Department",
        "Remove An Existing Employee Role",
        "Exit The Application"
      ]

  })
    .then(function (response) {

      switch (response.selection) {



        case "View All Of The Employees":
          functions.allEmployees(connection, mainMenu);
          break;


        case "View All Of The Departments":
          functions.allDepartments(connection, mainMenu);
          break;


        case "View All Of The Employee Roles":
          functions.allEmployeeRoles(connection, mainMenu);
          break;


        case "Add A New Department":
          functions.addNewDepartment(connection, mainMenu);
          break;


        case "Add A New Employee":
          functions.addNewEmployee(connection, mainMenu);
          break;


        case "Add A New Employee Role":
          functions.addNewEmployeeRole(connection, mainMenu);
          break;


        case "Update An Employee's Role":
          functions.updateEmployeeRole(connection, mainMenu);
          break;


        case "Remove An Existing Employee":
          functions.removeEmployee(connection, mainMenu);
          break;


        case "Remove An Existing Department":
          functions.removeDepartment(connection, mainMenu);
          break;

        case "Remove An Existing Employee Role":
          functions.removeEmployeeRole(connection, mainMenu);
          break;




        // exit

        case "Exit The Application":
          console.log("\n");
          console.log("---------");
          console.log("\nGood Bye!\n");
          console.log("---------");
          console.log("\n");
          connection.end();
          break;

      }

    })

};