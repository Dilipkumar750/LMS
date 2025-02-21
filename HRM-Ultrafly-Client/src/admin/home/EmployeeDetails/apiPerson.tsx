import React from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select, message } from 'antd';
import axios from 'axios';

interface PersonalFormProps {
  setActiveTab: (key: string) => void;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ setActiveTab }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      
      const formattedValues = {
        ...values,
        dob: values.dob?.format('YYYY-MM-DD'),
        dateofJoining: values.dateofJoining?.format('YYYY-MM-DD'),
      };

      
      const response = await axios.post('http://your-backend-api-url/personal-details', formattedValues);
      
      if (response.status === 200) {
        message.success('Form submitted successfully!');
        setActiveTab('2');
      } else {
        message.error('Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('An error occurred during submission.');
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
        message.error('Please fill all required fields correctly.');
      }}
    >
      <Form.Item
        label={<span className="font-medium text-[16px]">Employee Name</span>}
        name="employeeName"
        rules={[{ required: true, message: 'Please input Employee Name!' }]}
      >
        <Input placeholder="Enter full name" style={{ width: '70%', paddingBottom: '18px' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Email</span>}
        name="email"
        rules={[
          { required: true, message: 'Please input a valid Email!' },
          { type: 'email', message: 'Invalid email format!' },
        ]}
      >
        <Input placeholder="Enter email address" style={{ width: '70%', paddingBottom: '18px' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Mobile</span>}
        name="mobile"
        rules={[
          { required: true, message: 'Please input Mobile Number!' },
          { pattern: /^[0-9]{10}$/, message: 'Mobile number must be 10 digits!' },
        ]}
      >
        <InputNumber
          placeholder="Enter mobile number"
          maxLength={10}
          controls={false}
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Date of Birth</span>}
        name="dob"
        rules={[{ required: true, message: 'Please select Date of Birth!' }]}
      >
        <DatePicker placeholder="Select date of birth" style={{ width: '70%' }} className="!h-12" picker="date" />
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
        name="dateofJoining"
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

      {/* Other Form Items */}
      {/* Add other fields here similar to the above */}

      <Form.Item wrapperCol={{ span: 24 }} className="col-span-2 flex justify-end">
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
