import React, { useState } from "react";
import { Table, Select, Upload, Button, Card, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import pdfImage from "../../../Assets/pdf.jpg";

const TaskAllocation: React.FC = () => {
  const [dataSource, setDataSource] = useState<any[]>([
    {
      key: "1",
      courseName: "React Development",
      task: "Complete React Assignment",
      description: "Build a fully functional React app using Hooks and Context API.",
      deadline: "2025-02-25",
      status: "Pending",
      projectFile: pdfImage,
      allocatedBy: "Professor John Doe",
    },
    {
      key: "2",
      courseName: "Backend Engineering",
      task: "Develop Backend API",
      description: "Create a RESTful API using Node.js and Express with MongoDB.",
      deadline: "2025-02-28",
      status: "In Progress",
      projectFile: pdfImage,
      allocatedBy: "Dr. Sarah Lee",
    },
    {
      key: "3",
      courseName: "UI/UX Design",
      task: "Create UI Wireframe",
      description: "Design wireframes for a new mobile application.",
      deadline: "2025-03-05",
      status: "Pending",
      projectFile: pdfImage,
      allocatedBy: "Prof. Michael Brown",
    },
    {
      key: "4",
      courseName: "Machine Learning",
      task: "Train ML Model",
      description: "Train and evaluate a machine learning model on a given dataset.",
      deadline: "2025-03-10",
      status: "Completed",
      projectFile: pdfImage,
      allocatedBy: "Dr. Emily Watson",
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (task: any) => {
    setSelectedTask(task);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedTask(null);
  };

  const handleStatusChange = (key: string, status: string) => {
    setDataSource(
      dataSource.map((item) => (item.key === key ? { ...item, status } : item))
    );
  };

  const handleFileUpload = (key: string, file: any) => {
    setDataSource(
      dataSource.map((item) =>
        item.key === key ? { ...item, projectFile: file } : item
      )
    );
  };

  const columns = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
      render: (_: any, record: any) => (
        <a onClick={() => showModal(record)} style={{ color: "#1890ff", cursor: "pointer" }}>
          {record.courseName}
        </a>
      ),
    },
    { title: "Task", dataIndex: "task", key: "task" },
    { title: "Allocated By", dataIndex: "allocatedBy", key: "allocatedBy" },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
      render: (text: string) => dayjs(text).format("YYYY-MM-DD"),
    },
    {
      title: "Project Upload",
      dataIndex: "projectFile",
      key: "projectFile",
      render: (_: any, record: any) => (
        <Upload
          beforeUpload={(file) => {
            handleFileUpload(record.key, file);
            return false;
          }}
        >
          <Button icon={<UploadOutlined />} style={{ backgroundColor: "#1890ff", color: "#fff" }}>Upload</Button>
        </Upload>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Select
          value={status}
          onChange={(value) => handleStatusChange(record.key, value)}
          style={{ width: "100%", backgroundColor: "#f0f0f0" }}
        >
          <Select.Option value="Completed">Completed</Select.Option>
          <Select.Option value="In Progress">In Progress</Select.Option>
          <Select.Option value="Pending">Pending</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div style={{ padding: "12px", backgroundColor: "#f5f5f5" }}>
      <h2 style={{ color: "#1890ff" }}>My Assigned Tasks</h2>
      <Table dataSource={dataSource} columns={columns} rowKey="key" style={{ backgroundColor: "#fff" }} />

      <Modal title="Task Details" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        {selectedTask && (
          <div>
            <p><strong>Task Name:</strong> {selectedTask.task}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Allocated By:</strong> {selectedTask.allocatedBy}</p>
            <p><strong>Deadline:</strong> {dayjs(selectedTask.deadline).format("YYYY-MM-DD")}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            {selectedTask.projectFile && (
              <img src={selectedTask.projectFile} alt="Project File" style={{ width: "100%", marginTop: "10px" }} />
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TaskAllocation;