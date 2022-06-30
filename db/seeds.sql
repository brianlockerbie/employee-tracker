Use employeesDb;

-- Departments
INSERT INTO department (department_name, the_budget) VALUES
("Sales", 75000),
("Engineering", 120000),
("Finance", 90000),
("Legal", 200000),
("Operations", 110000);

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
("Operations Manager", 110000, 5),
("Operations Associate", 75000, 5);

-- Employees
INSERT INTO employee (first_name, last_name, employee_department, salary, role_id, manager_id) VALUES
("Mike", "Chan", "Sales", 80000, 1, 1),
("Matt", "Leblanc", "Sales", 100000, 1, NULL),
("Ashley", "Rodriguez", "Engineering", 150000, 2, NULL),
("Kevin", "Tupik", "Engineering", 120000, 2, 2),
("Kunal", "Singh", "Finance", 160000, 3, NULL),
("Malia", "Brown", "Finance", 125000, 3, 3),
("Sarah", "Lourd", "Legal", 250000, 4, NULL),
("Tom", "Allen", "Legal", 190000, 4, 4),
("Carly", "Bell","Operations", 110000, 5, NULL),
("Amber", "Smith", "Operations", 75000, 5, 5);

INSERT INTO manager (id, manager_name) VALUES
(1, "Matt Leblanc"),
(2, "Ashley Rodriguez"),
(3, "Kunal Singh"),
(4, "Sarah Lourd"),
(5, "Carly Bell");

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;
SELECT * FrOM manager;