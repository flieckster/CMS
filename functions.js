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

function addNewEmployeeRole(connection, mainMenu) {


    connection.query("SELECT * FROM department_info", function (err, res) {

        const departmentChoices = res.map(row => {

            const choice = {

                name: row.department_name,
                value: row.id

            };

            return choice

        })

        inquirer.prompt([

            {
                type: "input",
                name: "title",
                message: "What type of role would you like to create?",
                default: "Data Analyst",
                validate: function (response) {
                    if (response.length < 1) {
                        return console.log("That is not a valid role. Please try again");
                    }
                    return true;
                }
            },
            {

                type: "input",
                name: "salary",
                message: "What is the starting salary for this new role?",
                default: "75000.00",
                validate: function (response) {

                    if (response.length < 1) {
                        return console.log("That is not a valid Salary. Please try again");
                    }
                    return true;
                }
            },
            {
                type: "list",
                name: "department_id",
                choices: departmentChoices,
                message: "What department will this role be a part of?"
            }

        ]).then(function (response) {
            connection.query("INSERT INTO role_info SET ?", response, (err, res) => {
                if (err)
                    throw err;
                console.log("\n\n");
                console.log("Your new employee role has been successfully created.");
                console.log("\n\n");
                mainMenu();
            });
        })
    })
};

function addNewEmployee(connection, mainMenu) {
    const newHire = {};
    connection.query("SELECT * FROM role_info", function (err, res) {
        if (err)
            throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the first name of your newly hired employee?",
                default: "John",
                validate: function (response) {

                    if (response.length < 1) {

                        return console.log("That is not a valid first name. Please try again");
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the last name of your newly hired employee?",
                default: "Doe",
                validate: function (response) {
                    if (response.length < 1) {
                        return console.log("That is not a valid last name. Please try again");
                    }
                    return true;
                }
            },
            {
                type: "list",
                name: "role_id",
                message: "What role will this newly hired employee be filling?",
                default: "Web Developer",
                choices: function () {
                    const choice = [];
                    for (var i = 0; i < res.length; i++) {
                        choice.push(res[i].title);
                    }
                    return choice;
                },
            },
        ]).then(function (response) {
            newHire.first_name = response.first_name;
            newHire.last_name = response.last_name;
            connection.query("SELECT * FROM role_info WHERE title = ?", response.role_id, function (err, res) {
                if (err)
                    throw err;
                newHire.role_id = res[0].id;
                connection.query("SELECT * from employee_info", (err, res) => {
                    if (err)
                        throw err;
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "manager_name",
                            message: "Who is this newly hired employee's manager?",
                            choices: function () {
                                let choice = [];
                                for (var i = 0; i < res.length; i++) {
                                    choice.push(res[i].first_name);
                                }
                                return choice;
                            },
                        }
                    ]).then(function (response) {
                        connection.query("SELECT id FROM employee_info WHERE first_name = ?", response.manager_name, function (err, res) {
                            if (err)
                                throw err;
                            newHire.manager_id = res[0].id;
                            connection.query("INSERT INTO employee_info SET ?", newHire, (err, res) => {
                                if (err)
                                    throw err;
                                console.log("\n\n");
                                console.log("Your new employee has been successfully created.");
                                console.log("\n\n");
                                mainMenu();
                            })
                        })
                    });
                });
            });
        });
    });
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


function updateEmployeeRole(connection, mainMenu) {


    let roleUpdate = {};

    connection.query("SELECT employee_info.id, employee_info.first_name, employee_info.last_name, role_info.title, role_info.salary, department_info.department_name AS department, manager_alias.first_name AS manager FROM employee_info LEFT JOIN employee_info AS manager_alias ON manager_alias.id = employee_info.manager_id JOIN role_info ON employee_info.role_id = role_info.id JOIN department_info ON role_info.department_id = department_info.id ORDER BY employee_info.id", (err, res) => {

        if (err)
            throw err;


        inquirer.prompt([

            {
                type: "list",
                name: "employee_info",
                message: "Which one of your employees would you like to update?",
                choices: function () {

                    let choice = [];

                    for (var i = 0; i < res.length; i++) {

                        choice.push(res[i].first_name);
                    }

                    return choice;
                },

            }

        ]).then(function (response) {

            roleUpdate.first_name = response.employee_info;

            connection.query("SELECT * FROM role_info", function (err, res) {

                if (err)
                    throw err;


                inquirer.prompt([

                    {
                        type: "list",
                        name: "roleUpdate",
                        message: "What would you like you to update their role to?",
                        choices: function () {

                            let choice = [];

                            for (var i = 0; i < res.length; i++) {

                                choice.push(res[i].title);
                            }

                            return choice;
                        },
                    }

                ]).then(function (response) {

                    connection.query("SELECT * FROM role_info WHERE title = ?", response.roleUpdate, function (err, res) {

                        if (err)
                            throw err;

                        roleUpdate.role_id = res[0].id;

                        connection.query("UPDATE employee_info SET role_id = ? WHERE first_name = ?", [roleUpdate.role_id, roleUpdate.first_name], function (err, res) {

                            if (err)
                                throw err;

                            console.log("\n\n");
                            console.log("Your employee's role has been successfully updated.");
                            console.log("\n\n");

                            mainMenu();
                        })

                    })

                });

            });

        });

    })

};




function removeEmployee(connection, mainMenu) {

    connection.query("SELECT * FROM employee_info", function (err, res) {
        if (err)
            throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "first_name",
                message: "Which existing employee would you like to remove?",
                choices: function () {

                    let choice = [];

                    for (var i = 0; i < res.length; i++) {

                        choice.push(res[i].first_name);
                    }
                    return choice;
                },
            }
        ]).then(function (response) {


            connection.query("DELETE FROM employee_info WHERE first_name = ?", response.first_name, function (err, res) {
                if (err)
                    throw err;
                console.log("\n\n");
                console.log("This employee has been successfully removed.");
                console.log("\n\n");
                mainMenu();
            });
        });
    });
};

//

function removeDepartment(connection, mainMenu) {

    connection.query("SELECT * FROM department_info", function (err, res) {

        if (err)
            throw err;


        inquirer.prompt([
            {
                type: "list",
                name: "department_name",
                message: "Which department would you like to remove?",
                choices: function () {
                    let choice = [];
                    for (var i = 0; i < res.length; i++) {
                        choice.push(res[i].department_name);
                    }
                    return choice;
                },
                
            }
        ])
            .then(function (response) {

                connection.query("DELETE FROM department_info WHERE department_name = ?", response.department_name, function (err, res) {

                    if (err) 
                        throw err;
                    console.log("\n\n");    
                    console.log("This department has been successfully removed.");
                    console.log("\n\n");
                    mainMenu();
                });
            });
    
        });
    };




function removeEmployeeRole(connection, mainMenu) {

    connection.query("SELECT * FROM role_info", function (err, res) {

        if (err)
            throw err;
        inquirer.prompt([
            {
                type: "list",
                name: "title",
                message: "Which one of the current roles would you like to remove?",
                choices: function () {
                    let choice = []
                    for (var i = 0; i < res.length; i++) {
                        choice.push(res[i].title);
                    }
                    return choice;
                },
            }
        ]).then(function (response) {
            connection.query("DELETE FROM role_info WHERE title = ?", response.title, function (err, res) {
                if (err)
                    throw err;
                console.log("\n\n");
                console.log("This role has been successfully removed.");
                console.log("\n\n");
                mainMenu();
            });
        });
    });
};


module.exports = {

  allEmployees: allEmployees,
  allDepartments: allDepartments,
  allEmployeeRoles: allEmployeeRoles,
  addNewEmployee: addNewEmployee,
  addNewDepartment: addNewDepartment,
  addNewEmployeeRole: addNewEmployeeRole,
  updateEmployeeRole: updateEmployeeRole,
  removeEmployee: removeEmployee,
  removeDepartment: removeDepartment,
  removeEmployeeRole: removeEmployeeRole,

};