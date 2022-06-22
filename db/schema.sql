DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

Use employees_db;


CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    dept VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    manager_id INT,
    roles_id INT NOT NULL,
    FOREIGN KEY (manager_id) REFERENCES employee (id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    PRIMARY KEY (id)
);

