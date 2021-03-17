const inquirer = require("inquirer");
// const table = require('console.table');
require("./app.js");
function addNewDepartment(connection, mainMenu) {

  inquirer.prompt([

      {
          type: "input",
          name: "department_name",
          message: "What type of new department would you like to create?",
          default: "Data Analysis",
          validate: function (response) {
              if (response.length < 1) {
                  return console.log("That is not a valid department name. Please try again.");
              }
              return true;
          }
      }

  ]).then(function (response) {

      connection.query("INSERT INTO department_info (department_name) VALUES (?)", response.department_name, (err, res) => {

          if (err)
              throw err;

          console.log("\n\n");
          console.log("Your new department has been successfully created.");
          console.log("\n\n");

          mainMenu();

      });

  })

};

function allEmployees(connection, mainMenu) {

  connection.query("SELECT * FROM employee_info", (err, res) => {
      if (err)
          throw err;

      console.log("\n\n");
      console.table(res);
      console.log("\n\n");

      mainMenu();

  })

};

function allDepartments(connection, mainMenu) {

    connection.query("SELECT * FROM department_info", (err, res) => {
        if (err)
            throw err;
  
        console.log("\n\n");
        console.table(res);
        console.log("\n\n");
  
        mainMenu();
  
    })
  
  };

  function allEmployeeRoles(connection, mainMenu) {

    connection.query("SELECT * FROM role_info", (err, res) => {
        if (err)
            throw err;
  
        console.log("\n\n");
        console.table(res);
        console.log("\n\n");
  
        mainMenu();
  
    })
  
  };

module.exports = {

  allEmployees: allEmployees,
  allDepartments: allDepartments,
  allEmployeeRoles: allEmployeeRoles,
  // addNewEmployee: addNewEmployee,
  addNewDepartment: addNewDepartment
  // addNewEmployeeRole: addNewEmployeeRole,
  // updateEmployeeRole: updateEmployeeRole,
  // removeEmployee: removeEmployee,
  // removeDepartment: removeDepartment,
  // removeEmployeeRole: removeEmployeeRole,

};