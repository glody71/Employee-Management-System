import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Button,
  Space,
  Popconfirm,
  message,
  Breadcrumb,
  Card,
  Row,
  Col,
} from "antd";
import { getEmployeeById, deleteEmployee } from "../services/api";
import type { Employee } from "../types";

const { Title, Text } = Typography;

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployee = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getEmployeeById(Number(id));
      setEmployee(data);
    } catch (error) {
      message.error("Failed to fetch employee details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteEmployee(Number(id));
      message.success("Employee deleted");
      navigate("/employees");
    } catch (error) {
      message.error("Failed to delete employee");
    }
  };

  if (loading || !employee) {
    return <Text>Loading...</Text>;
  }

  return (
    <div style={{ padding: 24 }}>
      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to="/employees">Employees</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{employee.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2} style={{ marginBottom: 24 }}>
        {employee.name}
      </Title>

      <Card bordered style={{ maxWidth: 600 }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Text strong>Email:</Text>
          </Col>
          <Col span={16}>
            <Text>{employee.email}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Position:</Text>
          </Col>
          <Col span={16}>
            <Text>{employee.position}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Department:</Text>
          </Col>
          <Col span={16}>
            <Text>{employee.department}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Status:</Text>
          </Col>
          <Col span={16}>
            <Text>{employee.status}</Text>
          </Col>

          <Col span={8}>
            <Text strong>Salary:</Text>
          </Col>
          <Col span={16}>
            <Text>
              {employee.salary?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </Text>
          </Col>

          <Col span={8}>
            <Text strong>Hire Date:</Text>
          </Col>
          <Col span={16}>
            <Text>
              {employee.hire_date
                ? new Date(employee.hire_date).toLocaleDateString("id-ID")
                : "-"}
            </Text>
          </Col>
        </Row>
      </Card>

      <Space style={{ marginTop: 24 }}>
        <Button
          type="primary"
          onClick={() => {
            if (employee?.id) {
              navigate(`/employees/edit/${employee.id}`);
            }
          }}
        >
          Edit
        </Button>
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
        <Button onClick={() => navigate("/employees")}>Back to List</Button>
      </Space>
    </div>
  );
};

export default EmployeeDetails;
