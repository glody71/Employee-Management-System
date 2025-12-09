import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, InputNumber, Button, Select, DatePicker, message, Card, Space, Row, Col } from "antd";
import type { Employee } from "../types";
import { createEmployee, updateEmployee, getEmployeeById } from "../services/api";
import dayjs from "dayjs";

const { Option } = Select;

const EmployeeForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState<Employee | null>(null);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      getEmployeeById(Number(id))
        .then((data) => {
          setEmployee(data);
          form.setFieldsValue({
            ...data,
            hire_date: dayjs(data.hire_date),
          });
        })
        .catch(() => message.error("Failed to fetch employee data"))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    const payload: Employee = {
      id: employee?.id || 0,
      name: values.name,
      email: values.email,
      position: values.position,
      department: values.department,
      salary: values.salary,
      hire_date: values.hire_date.format("YYYY-MM-DD"),
      status: values.status,
    };

    try {
      if (isEdit) {
        await updateEmployee(payload, payload.id);
        message.success("Employee updated successfully");
      } else {
        await createEmployee(payload);
        message.success("Employee created successfully");
      }
      navigate("/employees");
    } catch (error) {
      message.error("Failed to save employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card 
      title={isEdit ? "Edit Employee" : "Add New Employee"} 
      style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ status: "active" }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Employee Name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Invalid email format" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24}>
            <Form.Item
              label="Position"
              name="position"
              rules={[{ required: true, message: "Please enter position" }]}
            >
              <Input placeholder="Position" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24}>
            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: "Please select department" }]}
            >
              <Select placeholder="Select department">
                <Option value="HR">HR</Option>
                <Option value="IT">IT</Option>
                <Option value="Finance">Finance</Option>
                <Option value="Marketing">Marketing</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[
                { required: true, message: "Please enter salary" },
                { type: "number", min: 0, message: "Salary must be positive" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) => `Rp ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value: any) => value.replace(/\Rp\s?|(,*)/g, "")}
                placeholder="Salary"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24}>
            <Form.Item
              label="Hire Date"
              name="hire_date"
              rules={[{ required: true, message: "Please select hire date" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24}>
            <Form.Item
              label="Status"
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space wrap>
            <Button type="primary" htmlType="submit" loading={loading}>
              {isEdit ? "Update" : "Create"}
            </Button>
            <Button onClick={() => navigate("/employees")}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EmployeeForm;
