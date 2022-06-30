DROP DATABASE IF EXISTS employeesDb;
CREATE database employeesDb;

Use employeesDb;


CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL,
    department_name VARCHAR(30) NOT NULL,
    the_budget DECIMAL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    employee_department VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES role(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    PRIMARY KEY (id)
);

CREATE TABLE manager (
    id INT NOT NULL,
    manager_name VARCHAR(30) NOT NULL
);

