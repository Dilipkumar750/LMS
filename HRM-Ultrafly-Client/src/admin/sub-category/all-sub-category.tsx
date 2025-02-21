import React, { useEffect, useState } from "react";
import { Button, Form, Input, Drawer, DatePicker, List, message, Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

// Announcement Type
interface Announcement {
  id: string;
  title: string;
  description: string;
  eventDate: string;
}

export const Announcement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    setLoading(true);
    // Simulating fetching data
    const data = [
      {
        id: "1",
        title: "Spring Sale",
        description: "Get up to 50% off on selected items.",
        eventDate: "2025-01-30T00:00:00Z",
      },
      {
        id: "2",
        title: "New Year Discounts",
        description: "Limited time offer on all products.",
        eventDate: "2025-02-15T00:00:00Z",
      },
    ];
    setAnnouncements(data);
    setLoading(false);
    checkExpiredAnnouncements(data);
  };

  // Check if any announcement has passed its end date and remove it
  const checkExpiredAnnouncements = (data: Announcement[]) => {
    const currentTime = moment();
    const updatedAnnouncements = data.filter(
      (announcement) => moment(announcement.eventDate).isAfter(currentTime)
    );
    setAnnouncements(updatedAnnouncements);
  };

  const handleSaveAnnouncement = (values: { title: string; description: string; eventDate: string }) => {
    if (currentAnnouncement) {
      // Edit existing announcement
      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement.id === currentAnnouncement.id
            ? { ...announcement, ...values }
            : announcement
        )
      );
    } else {
      // Add new announcement
      const newAnnouncement: Announcement = {
        id: (announcements.length + 1).toString(),
        title: values.title,
        description: values.description,
        eventDate: values.eventDate,
      };
      setAnnouncements((prev) => [...prev, newAnnouncement]);
    }

    setIsDrawerOpen(false);
    message.success(currentAnnouncement ? "Announcement updated" : "Announcement added");
  };

  const handleDelete = (id: string) => {
    setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id));
    message.success("Announcement deleted");
  };

  const showEditDrawer = (announcement: Announcement) => {
    setCurrentAnnouncement(announcement);
    form.setFieldsValue({
      title: announcement.title,
      description: announcement.description,
      eventDate: moment(announcement.eventDate),
    });
    setIsDrawerOpen(true);
  };

  const showAddDrawer = () => {
    setCurrentAnnouncement(null);
    form.resetFields();
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-white h-full px-8 py-6">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <Button
          type="primary"
          onClick={showAddDrawer}
          size="large"
          className="bg-blue-600 hover:bg-blue-700 text-white w-1/6"
        >
          Add Announcement
        </Button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Manage Announcements</h2>

      {/* List of Announcements inside a Card */}
      <Card loading={loading} title="Announcements" bordered={false}>
        <List
          loading={loading}
          dataSource={announcements}
          renderItem={(announcement) => (
            <List.Item
              key={announcement.id}
              actions={[
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => showEditDrawer(announcement)}
                >
                  Edit
                </Button>,
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(announcement.id)}
                  danger
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={announcement.title}
                description={
                  <div>
                    <p>{announcement.description}</p>
                    <p>
                      <strong>Event Date:</strong> {moment(announcement.eventDate).format("YYYY-MM-DD")}
                    </p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Drawer for adding/editing announcement */}
      <Drawer
        title={currentAnnouncement ? "Edit Announcement" : "Add Announcement"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="right"
        width={400}
        className="rounded-xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveAnnouncement}
          initialValues={{
            title: currentAnnouncement?.title || "",
            description: currentAnnouncement?.description || "",
            eventDate: currentAnnouncement ? moment(currentAnnouncement.eventDate) : null,
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the announcement title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the announcement description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Event Date"
            name="eventDate"
            rules={[{ required: true, message: "Please select the event date" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};
