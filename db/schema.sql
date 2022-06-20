DROP DATABASE IF EXISTS employeeDb;
CREATE database employeeDb;

Use employeeDb;


CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    department_id INT NOT NUL,
    salary DECIMAL(10,2)  NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);