import React, { useState } from "react";
import { Calendar, Badge, Form, Input, Button, Table, message, DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import "antd/dist/reset.css"; // Ant Design default styling

interface LeaveData {
  date: string;
  description: string;
}

const LeaveCalendar: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveData[]>([]);
  const [editingLeave, setEditingLeave] = useState<LeaveData | null>(null);
  const [form] = Form.useForm();

  const handleAddLeave = (values: { date: Dayjs; description: string }) => {
    const newLeave = {
      date: values.date.format("YYYY-MM-DD"),
      description: values.description,
    };

    setLeaves((prevLeaves) => [...prevLeaves, newLeave]);
    form.resetFields();
    message.success("Leave added successfully!");
  };

  const handleDeleteLeave = (date: string) => {
    setLeaves((prevLeaves) => prevLeaves.filter((leave) => leave.date !== date));
    message.success("Leave deleted successfully!");
  };

  const handleEditLeave = (values: { date: Dayjs; description: string }) => {
    setLeaves((prevLeaves) =>
      prevLeaves.map((leave) =>
        leave.date === editingLeave?.date
          ? { ...leave, date: values.date.format("YYYY-MM-DD"), description: values.description }
          : leave
      )
    );
    setEditingLeave(null);
    message.success("Leave updated successfully!");
  };

  const handleEditClick = (leave: LeaveData) => {
    setEditingLeave(leave);
    form.setFieldsValue({ date: dayjs(leave.date), description: leave.description });
  };

  const getListData = (value: Dayjs): { type: "default" | "error" | "success" | "processing" | "warning"; content: string }[] => {
    const leave = leaves.find((leave) => leave.date === value.format("YYYY-MM-DD"));
    return leave ? [{ type: "error", content: leave.description }] : [];
  };

  const dateCellRender = (value: Dayjs): React.ReactNode => {
    const listData = getListData(value);
    const isSaturday = value.day() === 6;
    const isSunday = value.day() === 0;

    return (
      <div
        className={`p-2 rounded ${
          isSaturday ? "bg-red-100 text-red-600" : isSunday ? "bg-blue-100 text-blue-600" : ""
        }`}
      >
        <div className="font-bold">
          {isSaturday || isSunday ? value.format("dddd, MMMM D") : ""}
        </div>
        <ul className="list-none m-0 p-0">
          {listData.map((item, index) => (
            <li key={index} className="py-1">
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: LeaveData) => (
        <div className="flex gap-2">
          <Button type="link" onClick={() => handleEditClick(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteLeave(record.date)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="rounded-2xl bg-white shadow-lg p-6 max-w-6xl w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          My Custom Calendar
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="col-span-1 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-medium mb-4">{editingLeave ? "Edit Leave" : "Add Leave"}</h2>
            <Form
              form={form}
              onFinish={editingLeave ? handleEditLeave : handleAddLeave}
              layout="vertical"
            >
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter a description" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  {editingLeave ? "Update Leave" : "Add Leave"}
                </Button>
                {editingLeave && (
                  <Button
                    type="default"
                    onClick={() => {
                      setEditingLeave(null);
                      form.resetFields();
                    }}
                    block
                    className="mt-2"
                  >
                    Cancel
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>

          <div className="col-span-3">
            <Calendar dateCellRender={dateCellRender} className="rounded-xl shadow-sm border-0" />
            <h2 className="text-xl font-medium mt-6 mb-4">Leave List</h2>
            <Table columns={columns} dataSource={leaves} rowKey="date" pagination={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
