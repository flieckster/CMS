DROP DATABASE IF EXISTS cms_db;

CREATE DATABASE cms_db;
USE cms_db;
CREATE TABLE department_info (
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(60) NOT NULL,
  PRIMARY KEY(id)
);
CREATE TABLE role_info (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(60) NOT NULL,
  salary DECIMAL(18,2) NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department_info(id) ON DELETE CASCADE
);
CREATE TABLE employee_info (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  first_name VARCHAR(60) NOT NULL,
  last_name VARCHAR(60) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role_info(id),
  FOREIGN KEY (manager_id) REFERENCES employee_info(id) ON DELETE CASCADE
);




