import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

interface PersonalFormProps {
  setActiveTab: (key: string) => void; // Prop to update the active tab
  saveData: (values: any) => void; // New prop to save the data
}

const PersonalForm: React.FC<PersonalFormProps> = ({ setActiveTab, saveData }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // Example API endpoint, replace with your actual API
      const apiEndpoint = 'https://example.com/api/employees';
      console.log(values);

      // Sending a POST request with form data
      const response = await axios.post(apiEndpoint, values);

      if (response.status === 200 || response.status === 201) {
        message.success('Personal details submitted successfully!');
        saveData(values);  // Save data when submission is successful
        setActiveTab('2'); // Navigate to the Educational Details tab
      } else {
        message.error('Failed to submit personal details.');
      }
      // saveData(values);  // Save data when submission is successful
      // setActiveTab('2'); // Navigate to the Educational Details tab
      // console.log(values);
    } catch (error) {
      console.error('Error submitting the form:', error);
      message.error('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: '100%' }}
      layout="vertical"
      className="px-12 mx-4 my-4 grid grid-cols-2 bg-white shadow-2xl"
      onFinish={handleSubmit}
      onFinishFailed={(errorInfo) => {
        console.error('Failed:', errorInfo);
      }}
    >
      <Form.Item
        label={<span className="font-medium text-[16px]">Employee Name</span>}
        name="name"
        rules={[{ required: true, message: 'Please input Employee Name!' }]}
      >
        <Input placeholder="Enter full name" style={{ width: '70%', paddingBottom: '18px' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Email</span>}
        name="email"
        rules={[{ required: true, message: 'Please input a valid Email!' }, { type: 'email', message: 'Invalid email format!' }]}
      >
        <Input placeholder="Enter email address" style={{ width: '70%', paddingBottom: '18px' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Mobile</span>}
        name="mobile"
        rules={[{ required: true, message: 'Please input Mobile Number!' }, { pattern: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits!' }]}
      >
        <InputNumber
          placeholder="Enter mobile number"
          maxLength={10}
          type="number"
          controls={false}
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Date of Birth</span>}
        name="dateOfBirth"
        rules={[{ required: true, message: 'Please select Date of Birth!' }]}
      >
       
        <DatePicker
          placeholder="Select date of birth"
          style={{ width: '70%' }}
          className="!h-12"
          picker="date"
        />
        
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Gender</span>}
        name="gender"
        rules={[{ required: true, message: 'Please select Gender!' }]}
      >
        <Select
          placeholder="Select gender"
          className="!h-12"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
          style={{ width: '70%' }}
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Date of Joining</span>}
        name="dateOfJoining"
        rules={[{ required: true, message: 'Please select Date of Joining!' }]}
      >
        <DatePicker placeholder="Select joining date" style={{ width: '70%' }} className="!h-12" />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Blood Group</span>}
        name="bloodGroup"
      >
        <Select
          placeholder="Select blood group"
          className="!h-12"
          options={[
            { value: 'A+', label: 'A+' },
            { value: 'A-', label: 'A-' },
            { value: 'B+', label: 'B+' },
            { value: 'B-', label: 'B-' },
            { value: 'O+', label: 'O+' },
            { value: 'O-', label: 'O-' },
            { value: 'AB+', label: 'AB+' },
            { value: 'AB-', label: 'AB-' },
          ]}
          style={{ width: '70%' }}
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Father's Name</span>}
        name="fatherName"
        rules={[{ required: true, message: 'Please enter Father Name!' }]}
      >
        <Input placeholder="Enter father's full name" style={{ width: '70%', paddingBottom: '18px' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Aadhar Number</span>}
        name="aadharNumber"
        rules={[{ required: true, message: 'Please enter the Aadhar Number!' }, { pattern: /^[0-9]{12}$/, message: 'Aadhar number must be 12 digits!' }]}
      >
        <InputNumber
          placeholder="Enter Aadhar number"
          maxLength={12}
          type="number"
          controls={false}
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Pan Number</span>}
        name="panNumber"
        rules={[{ required: true, message: 'Please enter the PAN Number!' }]}
      >
        <Input placeholder="Enter PAN number" maxLength={10} style={{ width: '70%', paddingBottom: '18px' }} />
      </Form.Item>

      {/* Employee Image Upload */}
      <Form.Item
        label={<span className="font-medium text-[16px]">Employee Image</span>}
        name="image"
        valuePropName="fileList"
        getValueFromEvent={({ fileList }) => fileList}
        rules={[{ required: true, message: 'Please upload an employee image!' }]}
      >
        <Upload
          accept=".jpeg,.jpg,.png"
          beforeUpload={(file) => {
            const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isImage) {
              message.error('You can only upload JPG/PNG files!');
            }
            return isImage;
          }}
          showUploadList={false}  // Disable showing the uploaded image
          onChange={({ fileList }) => form.setFieldsValue({ employeeImage: fileList })} // Ensure the file list is updated in the form
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      {/* New Emergency Contact Number Field */}
      <Form.Item
        label={<span className="font-medium text-[16px]">Emergency Contact Number</span>}
        name="alternateNumber"
        rules={[
          { required: true, message: 'Please enter Emergency Contact Number!' },
          { pattern: /^[0-9]{10}$/, message: 'Contact number must be 10 digits!' },
        ]}
      >
        <Input
          placeholder="Enter emergency contact number"
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      {/* New Contact Person Name Field */}
      <Form.Item
        label={<span className="font-medium text-[16px]">Contact Person Name</span>}
        name="contactPersonName"
        rules={[{ required: true, message: 'Please enter contact person name!' }]}
      >
        <Input
          placeholder="Enter emergency contact person's name"
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      {/* New Contact Person Relationship Field */}
      <Form.Item
        label={<span className="font-medium text-[16px]">Contact Person Relationship</span>}
        name="contactPersonRelationship"
        rules={[{ required: true, message: 'Please enter relationship with contact person!' }]}
      >
        <Input
          placeholder="Enter relationship with contact person"
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{ span: 24 }}
        className="col-span-2 flex justify-end"
      >
        <div style={{ gridColumn: '2' }} className="flex justify-center">
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default PersonalForm;
