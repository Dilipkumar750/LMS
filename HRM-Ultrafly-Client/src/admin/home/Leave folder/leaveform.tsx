import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  message,
  Table,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";
import LeaveCalendar from "./LeaveCalendar";
import LeaveBalances from "./LeaveBalances";
import LeaveOverviewChart from "./LeaveOverviewChart";

const { RangePicker } = DatePicker;

const LeaveForm: React.FC = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);

  // API base URL
  const API_BASE_URL = "http://localhost:5001/api"; // Change to your backend API base URL

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/leaves`)
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaves:", error);
        message.error("Failed to load leave data");
      });
  }, []);

  const handleSubmit = (values: any) => {
    const [startDate, endDate] = values.dateRange;
    const days = endDate.diff(startDate, "day") + 1;
    const leaveData = {
      ...values,
      from: startDate.format("YYYY-MM-DD"),
      to: endDate.format("YYYY-MM-DD"),
      days,
      remainingDays: 30 - days,
      status: "Pending",
    };

    if (editingKey !== null) {
      axios
        .put(`${API_BASE_URL}/leaves/${editingKey}`, leaveData)
        .then(() => {
          const updatedData = dataSource.map((item) =>
            item.key === editingKey ? { ...leaveData, key: editingKey } : item
          );
          setDataSource(updatedData);
          setEditingKey(null);
          message.success("Leave updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating leave:", error);
          message.error("Failed to update leave");
        });
    } else {
      axios
        .post(`${API_BASE_URL}/leaves`, leaveData)
        .then((response) => {
          setDataSource([
            ...dataSource,
            { ...leaveData, key: response.data.key },
          ]);
          message.success("Leave applied successfully!");
        })
        .catch((error) => {
          console.error("Error applying leave:", error);
          message.error("Failed to apply leave");
        });
    }
    form.resetFields();
  };

  const handleEdit = (record: any) => {
    form.setFieldsValue({
      ...record,
      dateRange: [dayjs(record.from), dayjs(record.to)],
    });
    setEditingKey(record.key);
  };

  const handleDelete = (key: string) => {
    axios
      .delete(`${API_BASE_URL}/leaves/${key}`)
      .then(() => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        message.success("Leave deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting leave:", error);
        message.error("Failed to delete leave");
      });
  };

  const handleStatusChange = (key: string, status: string) => {
    axios
      .patch(`${API_BASE_URL}/leaves/${key}`, { status })
      .then(() => {
        const newData = dataSource.map((item) =>
          item.key === key ? { ...item, status } : item
        );
        setDataSource(newData);
        message.success("Status updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        message.error("Failed to update status");
      });
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },
    {
      title: "Days",
      dataIndex: "days",
      key: "days",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.key, value)}
          style={{ width: "100%" }}
        >
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
          <Select.Option value="Pending">Pending</Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: "12px" }}>
      {/* Left Panel */}

      <div style={{ flex: " 45%", maxWidth: "38%", marginLeft: "5px", height:"60%" }}>
        <Card title="Apply Leave" bordered>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{
              maxWidth: "500px",
              margin: "0 auto", // Centers the form
              padding: "30px",
              backgroundColor: "#f9f9f9", // Light background color for the form
              borderRadius: "6px",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)", // Soft shadow around form
              marginBottom: "4px"  // Reduce gap between elements
            }}
          >
            <Form.Item
              name="employeeId"
              label="Employee ID"
              rules={[{ required: true, message: "Please enter your employee ID!" }]}
            >
              <Input
                placeholder="Employee ID"
                style={{
                  borderRadius: "4px",
                  padding: "10px",
                  marginBottom: "2px"
                }}
              />
            </Form.Item>

            <Form.Item
              name="dateRange"
              label="Date Range"
              rules={[{ required: true, message: "Please select a date range!" }]}
            >
              <RangePicker
                style={{
                  width: "100%",
                  borderRadius: "4px",
                  padding: "10px",
                  marginBottom: "2px"
                }}
              />
            </Form.Item>

            <Form.Item
              name="leaveType"
              label="Leave Type"
              rules={[{ required: true, message: "Please select a leave type!" }]}
            >
              <Select
                placeholder="Select Leave Type"
                style={{
                  borderRadius: "4px",
                  marginBottom: "2px",
                }}
              >
                <Select.Option value="Sick Leave">Sick Leave</Select.Option>
                <Select.Option value="Casual Leave">Casual Leave</Select.Option>
                <Select.Option value="Maternity Leave">Paid Leave</Select.Option>
              </Select >
            </Form.Item>

            <Form.Item
              name="reason"
              label="Reason"
              rules={[{ required: true, message: "Please provide a reason!" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Reason for leave"
                style={{
                  borderRadius: "4px",
                  padding: "10px",
                  marginBottom: "2px"
                }}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                backgroundColor: "#1890ff", // Custom primary color
                borderRadius: "5px", // Rounded corners for the button
                padding: "12px 0", // Adds vertical padding to the button
                marginBottom: "2px"
              }}
            >
              {editingKey ? "Update" : "Submit"}
            </Button>
          </Form>

        </Card>
      </div>

      {/* Right Panel */}
      <div style={{ flex: "1 1 50%", maxWidth: "60%", marginTop: "0px", marginLeft: "15px" }}>
        <Card bordered>

          <div style={{ marginTop: "30px", marginBottom: "50px" }}>
            <LeaveBalances />
          </div>

          <div className="flex gap-20">  <div className="width-50">
            <LeaveCalendar />
          </div>

            <div style={{ marginTop: "20px", width: "50%" }}>
              <LeaveOverviewChart />
            </div>
          </div>


        </Card>
      </div>

      {/* Table Section */}
      <div style={{ width: "100%", padding:'6px', marginTop: "10px" }}>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  );
};

export default LeaveForm;
