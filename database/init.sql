CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    position VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary INTEGER NOT NULL,
    hire_date DATE NOT NULL,
    status VARCHAR(10) DEFAULT 'active' CHECK (status IN ('active', 'inactive'))
);


INSERT INTO employees (name, email, position, department, salary, hire_date, status)
VALUES
('Alice Johnson', 'alice@company.com', 'Backend Developer', 'Engineering', 12000000, '2023-01-15', 'active'),
('Michael Tan', 'michael@company.com', 'UI/UX Designer', 'Design', 10000000, '2022-07-03', 'active'),
('Sarah Kim', 'sarah@company.com', 'HR Manager', 'Human Resources', 15000000, '2021-10-11', 'active'),
('David Lee', 'david@company.com', 'Project Manager', 'Management', 17000000, '2020-05-25', 'inactive'),
('Emily Wong', 'emily@company.com', 'Frontend Developer', 'Engineering', 13000000, '2024-03-01', 'active');
