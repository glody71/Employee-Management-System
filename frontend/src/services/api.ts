import axios from "axios";
import type { Employee } from "../types";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// FETCH ALL
export const getEmployee = async (): Promise<Employee[]> => {
  try {
    const res = await api.get<Employee[]>("/employees");
    return res.data;
  } catch (error: any) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

// FETCH BY ID
export const getEmployeeById = async (id: number): Promise<Employee> => {
  try {
    const res = await api.get<Employee>(`/employees/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(`Error fetching employee with id ${id}:`, error);
    throw error;
  }
};

// CREATE
export const createEmployee = async (data: Employee): Promise<Employee> => {
  try {
    const res = await api.post<Employee>("/employees", data);
    return res.data;
  } catch (error: any) {
    console.error("Error creating employee:", error);
    throw error;
  }
};

// DELETE
export const deleteEmployee = async (id: number): Promise<void> => {
  try {
    await api.delete(`/employees/${id}`);
  } catch (error: any) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

// UPDATE
export const updateEmployee = async (
  data: Employee,
  id: number
): Promise<Employee> => {
  try {
    const res = await api.put<Employee>(`/employees/${id}`, data);
    return res.data;
  } catch (error:any) {
    console.error("Error updating employee:", error);
    throw error;
  }
};
