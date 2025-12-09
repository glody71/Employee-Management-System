require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test connection
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("DB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🎉" });
});

// GET ALL
app.get("/api/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
});

// GET BY ID
app.get("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(`SELECT * FROM employees WHERE id = $1 `, [
      id,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee" });
  }
});

// INSERT
app.post("/api/employees", async (req, res) => {
  try {
    const { name, email, position, department, salary, hire_date, status } =
      req.body;

    const result = await pool.query(
      `
      INSERT INTO employees 
      (name, email, position, department, salary, hire_date, status) 
      VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, 'active'))
      RETURNING *;
      `,
      [name, email, position, department, salary, hire_date, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error inserting employee" });
  }
});

// UPDATE
app.put("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, position, department, salary, hire_date, status } =
      req.body;

    const result = await pool.query(
      `
      UPDATE employees
      SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        position = COALESCE($3, position),
        department = COALESCE($4, department),
        salary = COALESCE($5, salary),
        hire_date = COALESCE($6, hire_date),
        status = COALESCE($7, status)
      WHERE id = $8
      RETURNING *;
      `,
      [name, email, position, department, salary, hire_date, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee updated successfully", data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating employee" });
  }
});

// DELETE
app.delete("/api/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM employees where id = $1 RETURNING *", [id]);
    res.status(200).json({ message: "delete successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee" });
  }
});

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Backend running on port:", process.env.PORT || 5000);
});
