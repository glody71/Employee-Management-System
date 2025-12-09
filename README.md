## 1. Project Overview

**Employee Management System** adalah aplikasi CRUD sederhana untuk mengelola data karyawan.  
Aplikasi ini memungkinkan pengguna untuk menambahkan, mengedit, menghapus, dan melihat detail karyawan.

**Technology Stack:**
- **Frontend:** React.js + TypeScript + Ant Design
- **Backend:** Node.js + Express
- **Database:** PostgreSQL

**Fitur Utama:**
- Menampilkan daftar karyawan dengan pagination, search, filter, dan sort
- Tambah, edit, hapus karyawan
- Detail karyawan dengan semua informasi (name, email, position, department, salary, hire date, status)
- Mobile responsive
- Validasi form (required, email format, positive salary)
- Breadcrumb navigation
- Success/error messages

---

## 2. Prerequisites

Sebelum menjalankan aplikasi, pastikan sistem Anda memiliki:

- **Node.js** >= 16.x
- **npm** atau **yarn**
- **Docker** & **Docker Compose** (opsional jika ingin containerized)
- **PostgreSQL** (bisa lokal atau container)

**System Requirements:**
- OS: Windows / Mac / Linux
- RAM: Minimal 4GB
- Port 3000 (frontend) dan 5000 (backend) tersedia

---

## 3. Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/username/employee-management.git
cd employee-management
```

### 2. Configure Environment Variable
Buat file .env di backend dan root

backend berisi
- DATABASE_URL=postgres://USERNAME:PASSWORD@db:5432/employees_db
- PORT=5000

.env di root berisi
- POSTGRES_USER=USERNAME
- POSTGRES_PASSWORD=PASSWORD
- POSTGRES_DB=employees_db

### 3. Run Docker
jalankan di terminal
docker compose up --build

## 4. API Documentation
Base URL
http://localhost:5000/api

Endpoints
| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| GET    | /employees     | Get all employees     |
| GET    | /employees/:id | Get employee by ID    |
| POST   | /employees     | Create new employee   |
| PUT    | /employees/:id | Update employee by ID |
| DELETE | /employees/:id | Delete employee by ID |

### Sample Requests

#### 1. Get all employees
```bash
curl -X GET http://localhost:5000/api/employees
```

#### 2. Get employee by ID
```bash
curl -X GET http://localhost:5000/api/employees/1
```

#### 3. Create employee
```bash
curl -X POST http://localhost:5000/api/employees \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "position": "Developer",
  "department": "IT",
  "salary": 10000000,
  "hire_date": "2025-12-01",
  "status": "active"
}'

```

#### 5. Update employee
```bash
curl -X PUT http://localhost:5000/api/employees/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "position": "Senior Developer",
  "department": "IT",
  "salary": 12000000,
  "hire_date": "2025-12-01",
  "status": "active"
}'

```

#### 5. Delete employee
```bash
curl -X DELETE http://localhost:5000/api/employees/1
```

## 5. Project Structure

### Frontend
```bash
frontend/
├─ node_modules/             # Node.js dependencies
├─ public/                   # Public assets (index.html, favicon, etc.)
├─ src/                      # Source code
│  ├─ assets/                # Images, icons, or other static assets
│  ├─ components/            # Reusable UI components
│  ├─ pages/                 # Page components for routing
│  │  ├─ EmployeeList.tsx    # Page to list all employees
│  │  ├─ EmployeeForm.tsx    # Page to create or edit employee
│  │  └─ EmployeeDetails.tsx # Page to view employee details
│  ├─ services/              # API service functions (fetch, create, update, delete)
│  ├─ App.css                # App-specific CSS
│  ├─ App.tsx                # Main React component with routes
│  ├─ index.css              # Global styles
│  ├─ main.tsx               # Entry point for React
│  └─ types.d.ts             # TypeScript type definitions (Employee, etc.)
├─ .gitignore                # Git ignore file
└─ Dockerfile                # Docker configuration for frontend
```

### Backend
```bash
backend/
├─ node_modules/             # Node.js dependencies
├─ src/
│  └─ index.js               # Main server entry point
├─ .env                      # Environment variables (database credentials, port, etc.)
└─ Dockerfile                # Docker configuration for backend
```

## 6. Screenshot Aplikasi

## 7. Challenges & Solutions
Salah satu tantangan utama dalam proyek ini adalah belajar Docker dari awal. Karena saya belum memiliki pengalaman sebelumnya, konsep seperti container, image, dan volume agak membingungkan. Untuk mengatasinya, saya mengikuti tutorial resmi Docker, berlatih dengan melakukan containerisasi aplikasi Node.js dan React sederhana, dan perlahan menerapkan konsep tersebut pada proyek ini

## 8. Future Improvements
- Menambahkan Auth Login Admin
- Menambahkan Dark Mode
