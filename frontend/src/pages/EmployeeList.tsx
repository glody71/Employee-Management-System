import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Typography,
  Space,
  Popconfirm,
  message,
  Row,
  Col,
} from "antd";
import { getEmployee, deleteEmployee } from "../services/api";
import type { Employee } from "../types";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getEmployee();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      message.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteEmployee(id);
      message.success("Employee deleted");
      fetchEmployees();
    } catch (error) {
      message.error("Failed to delete employee");
    } finally {
      setLoading(false);
    }
  };

  const departmentFilters = Array.from(
    new Set(employees.map((emp) => emp.department))
  ).map((dep) => ({
    text: dep,
    value: dep,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: departmentFilters,
      onFilter: (value: any, record: Employee) => record.department === value,
      filterSearch: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value: any, record: Employee) => record.status === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Employee) => (
        <Space wrap>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/employees/edit/${record.id}`);
            }}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDelete(record.id);
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              onClick={(e) => e.stopPropagation()}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const filteredData = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: 16 }}>
      <Title level={2}>Employee List</Title>

      <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by name or email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Button
            type="primary"
            block
            onClick={() => navigate("/employees/add")}
          >
            Add Employee
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        loading={loading}
        scroll={{ x: 800 }} // memungkinkan horizontal scroll di mobile
        onRow={(record) => ({
          onClick: () => navigate(`/employees/${record.id}`),
        })}
        rowClassName={() => "cursor-pointer"}
      />
    </div>
  );
};

export default EmployeeList;
