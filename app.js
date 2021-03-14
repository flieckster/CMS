const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Welcome1',
  database: 'cmsDB',
});


inquirer
.prompt({
  name: 'start',
  type: 'list',
  message: 'Which Department did you want to update?',
  choices: [
    'Find songs by artist',
    'Find all artists who appear more than once',
    'Find data within a specific range',
    'Search for a specific song',
    'New Deparment',
  ],
});
const getdepartments = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
};

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  getdepartments();
});
