import React from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import { submitEducationalDetails } from './api'; // Import the API function

interface EducationalDetailsProps {
  setActiveTab: (key: string) => void;
}

const EducationalDetails: React.FC<EducationalDetailsProps> = ({ setActiveTab }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const apiUrl = '/api/educational-details'; // Replace with your actual endpoint
      await submitEducationalDetails(apiUrl, values);
      setActiveTab('3'); // Navigate to the next tab
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: '100%' }}
      className="px-12 mx my-4 grid grid-cols-2 bg-white shadow-2xl"
      onFinish={handleSubmit}
      onFinishFailed={(errorInfo) => {
        message.error('Validation Failed! Please check the form fields.');
        console.error('Validation Error:', errorInfo);
      }}
    >
      <h2 className="text-xl font-bold mb-6 col-span-2">Educational Details</h2>

      <Form.Item
        label="10th Marks"
        name="tenthMarks"
        rules={[
          { required: true, message: 'Please input 10th Marks!' },
          { type: 'number', min: 0, max: 100, message: 'Marks must be between 0 and 100.' },
        ]}
      >
        <InputNumber
          placeholder="Enter 10th Marks"
          maxLength={3}
          controls={false}
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <Form.Item
        label="12th/Diploma Marks"
        name="twelfthMarks"
      >
        <Input
          placeholder="Enter 12th/Diploma Marks"
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <Form.Item
        label="UG Domain"
        name="UGDomain"
        rules={[{ required: true, message: 'Please input UG Domain!' }]}
      >
        <Input
          placeholder="Enter UG Domain"
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <Form.Item
        label="UG Year of Passing"
        name="UGYear"
        rules={[
          { required: true, message: 'Please input UG Year of Passing!' },
          { pattern: /^(19|20)\d{2}$/, message: 'Enter a valid year (e.g., 2020).' },
        ]}
      >
        <InputNumber
          placeholder="Enter UG Year of Passing"
          maxLength={4}
          controls={false}
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <Form.Item label="PG Domain" name="PGDomain">
        <Input
          placeholder="Enter PG Domain (Optional)"
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <Form.Item
        label="PG Year of Passing"
        name="PGYear"
        rules={[{ pattern: /^(19|20)\d{2}$/, message: 'Enter a valid year (e.g., 2020).' }]}
      >
        <InputNumber
          placeholder="Enter PG Year of Passing (Optional)"
          maxLength={4}
          controls={false}
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      <div className="col-span-2 flex justify-between mb-10">
        <Button type="default" onClick={() => setActiveTab('1')} style={{ width: '80px' }}>
          Previous
        </Button>
        <Button type="primary" htmlType="submit" style={{ width: '80px' }}>
          Next
        </Button>
      </div>
    </Form>
  );
};

export default EducationalDetails;
