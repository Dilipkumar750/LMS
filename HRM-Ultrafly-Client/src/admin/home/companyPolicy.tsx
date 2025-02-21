// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Button, Form, Input, List, Drawer, message } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { environment } from "../../environments/environment";

// interface Item {
//   id: number;
//   title: string;
//   description: string;
// }

// export const CompanyPolicy: React.FC = () => {
//   const [items, setItems] = useState<Item[]>([]);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [currentItem, setCurrentItem] = useState<Item | null>(null);
//   const [form] = Form.useForm();

//   const { isAuthenticated, currentUser } = useSelector(
//     (state: { userAuth: { isAuthenticated: boolean; currentUser: any } }) => state.userAuth
//   );
//   const userRole = currentUser?.user.role || "Employee";
//   // Base URL for your API
//   // const API_URL = "https://example.com/api/company-policies";

//   // Fetch data from the backend
//   const fetchItems = async () => {
//     try {
//       const response = await axios.get(`${environment.apiPort}/company-policies/policies`);
//       setItems(response.data);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       message.error("Failed to load company policies.");
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const showEditDrawer = (item: Item) => {
//     setCurrentItem(item);
//     form.setFieldsValue({ title: item.title, description: item.description });
//     setIsDrawerOpen(true);
//   };

//   const showAddDrawer = () => {
//     setCurrentItem(null);
//     form.resetFields();
//     setIsDrawerOpen(true);
//   };

//   const handleSave = async (values: { title: string; description: string }) => {
//     try {
//       if (currentItem) {
//         await axios.put(`${environment.apiPort}/company-policies/policyId/${currentItem.id}`, values);
//         setItems((prev) =>
//           prev.map((item) =>
//             item.id === currentItem.id
//               ? { ...item, title: values.title, description: values.description }
//               : item
//           )
//         );
//         message.success("Policy updated successfully!");
//       } else {
//         const response = await axios.post(`${environment.apiPort}/company-policies/policy`, values);
//         setItems((prev) => [...prev, response.data]);
//         message.success("Policy added successfully!");
//       }
//       setIsDrawerOpen(false);
//     } catch (error) {
//       console.error("Error saving item:", error);
//       message.error("Failed to save the company policy.");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`${environment.apiPort}/company-policies/policyId/${id}`);
//       setItems((prev) => prev.filter((item) => item.id !== id));
//       message.success("Policy deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       message.error("Failed to delete the company policy.");
//     }
//   };

//   return (
//     <div className="relative bg-white shadow-xl rounded-lg border border-gray-200 p-6 mb-6 dark:bg-gray-800 dark:border-gray-700">
//       <div className="flex justify-between items-center mb-6">
//         <span className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
//           Company Policy
//         </span>
//         {userRole === "Admin" && ( // Show Add Policy button only for admin
//           <Button
//             type="primary"
//             onClick={showAddDrawer}
//             size="large"
//             className="mt-4 px-8 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 w-40"
//           >
//             Add Policy
//           </Button>
//         )}
//       </div>

//       <List
//         dataSource={items}
//         renderItem={(item) => (
//           <List.Item
//             key={item.id}
//             className="hover:shadow-lg transition-shadow duration-300 rounded-lg bg-gray-100 dark:bg-gray-700 p-4 mb-4"
//             actions={
//               userRole === "Admin"
//                 ? [
//                     <Button
//                       type="link"
//                       icon={<EditOutlined />}
//                       onClick={() => showEditDrawer(item)}
//                       className="text-blue-500 hover:text-blue-700"
//                     >
//                       Edit
//                     </Button>,
//                     <Button
//                       type="link"
//                       icon={<DeleteOutlined />}
//                       danger
//                       onClick={() => handleDelete(item.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </Button>,
//                   ]
//                 : []
//             }
//           >
//             <List.Item.Meta
//               title={<span className="font-semibold text-lg">{item.title}</span>}
//               description={
//                 <span className="text-gray-600 dark:text-gray-300">{item.description}</span>
//               }
//             />
//           </List.Item>
//         )}
//       />

//       <Drawer
//         title={currentItem ? "Edit Policy" : "Add Policy"}
//         open={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         placement="right"
//         width={400}
//         className="rounded-xl"
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSave}
//           initialValues={{ title: "", description: "" }}
//         >
//           <Form.Item
//             label="Title"
//             name="title"
//             rules={[{ required: true, message: "Please enter a title" }]}
//           >
//             <Input className="rounded-md" />
//           </Form.Item>
//           <Form.Item
//             label="Description"
//             name="description"
//             rules={[{ required: true, message: "Please enter a description" }]}
//           >
//             <Input.TextArea rows={4} className="rounded-md" />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               block
//               className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
//             >
//               Save
//             </Button>
//           </Form.Item>
//         </Form>
//       </Drawer>import React, { useState, useEffect } from "react";



import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Form, Input, List, Drawer, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { environment } from "../../environments/environment";

interface Item {
  id: number;
  title: string;
  description: string;
}

export const CompanyPolicy: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | any>();
  const [form] = Form.useForm();

  const {  currentUser } = useSelector(
    (state: { userAuth: { isAuthenticated: boolean; currentUser: any } }) => state.userAuth
  );
  const userRole = currentUser?.user.role || "Employee";
  // Base URL for your API
  // const API_URL = "https://example.com/api/company-policies";

  // Fetch data from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${environment.apiPort}/company-policies/policies`);
      console.log(response.data)
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
      message.error("Failed to load company policies.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const showEditDrawer = (item: Item) => {
    setCurrentItem(item);
    form.setFieldsValue({ title: item.title, description: item.description });
    setIsDrawerOpen(true);
  };

  const showAddDrawer = () => {
    setCurrentItem(null);
    form.resetFields();
    setIsDrawerOpen(true);
  };

  const handleSave = async (values: { title: string; description: string }) => {
    try {
      if (currentItem) {
        await axios.put(`${environment.apiPort}/company-policies/policyId/${currentItem.id}`, values);
        setItems((prev) =>
          prev.map((item) =>
            item.id === currentItem.id
              ? { ...item, title: values.title, description: values.description }
              : item
          )
        );
        message.success("Policy updated successfully!");
      } else {
        const response = await axios.post(`${environment.apiPort}/company-policies/policy`, values);
        setItems((prev) => [...prev, response.data]);
        message.success("Policy added successfully!");
      }
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error saving item:", error);
      message.error("Failed to save the company policy.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${environment.apiPort}/company-policies/policyId/${id}`);
      setItems((prev) => prev.filter((item) => item.id !== id));
      message.success("Policy deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Failed to delete the company policy.");
    }
  };

  return (
    <div className="relative bg-white shadow-xl rounded-lg border border-gray-200 p-6 mb-6 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <span className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          Company Policy
        </span>
        {userRole === "Admin" && ( // Show Add Policy button only for admin
          <Button
            type="primary"
            onClick={showAddDrawer}
            size="large"
            className="mt-4 px-8 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 w-40"
          >
            Add Policy
          </Button>
        )}
      </div>

      <List
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className="hover:shadow-lg transition-shadow duration-300 rounded-lg bg-gray-100 dark:bg-gray-700 p-4 mb-4"
            actions={
              userRole === "Admin"
                ? [
                    <Button
                      type="link"
                      icon={<EditOutlined />}
                      onClick={() => showEditDrawer(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Button>,
                    <Button
                      type="link"
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </Button>,
                  ]
                : []
            }
          >
            <List.Item.Meta
              title={<span className="font-semibold text-lg">{item.title}</span>}
              description={
                <span className="text-gray-600 dark:text-gray-300">{item.description}</span>
              }
            />
          </List.Item>
        )}
      />

      <Drawer
        title={currentItem ? "Edit Policy" : "Add Policy"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="right"
        width={400}
        className="rounded-xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{ title: "", description: "" }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input className="rounded-md" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea rows={4} className="rounded-md" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

//     </div>
//   );
// };



