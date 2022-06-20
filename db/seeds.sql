Use employeeDb;

-- Departments
INSERT INTO departments (name) VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal"),
("Operations");

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
("Salesperson", 80000, 1),
("Sales Manager", 100000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4),
("Operations Manager", 111000, 5),
("Operations Associate", 75000, 5);

-- Employees
INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) VALUES
("Mike", "Chan", 2, 1, 1),
("Matt", "Leblanc", 5, NULL, 1),
("Ashley", "Rodriguez", 9, NULL, 2),
("Kevin", "Tupik", 4, 9, 2),
("Kunal", "Singh", 3, NULL, 3),
("Malia", "Brown", 8, 3, 3),
("Sarah", "Lourd", 1, NULL, 4),
("Tom", "Allen", 6, 1, 4),
("Carly", "Bell",7, NULL, 5),
("Amber", "Smith", 10, 7, 5);
