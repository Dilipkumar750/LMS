import React from 'react';
import axios from 'axios';
import { Button, Form, Input, InputNumber } from 'antd';

interface EducationalDetailsProps {
  setActiveTab: (key: string) => void;
  saveData: (values: EducationalDetailsFormValues) => void;
}

interface EducationalDetailsFormValues {
  tenthMarks: number | undefined;
  twelfthMarks: string | undefined;
  UGDomain: string | undefined;
  UGYear: number | undefined;
  PGDomain?: string;
  PGYear?: number;
}

const EducationalDetails: React.FC<EducationalDetailsProps> = ({ setActiveTab, saveData }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: EducationalDetailsFormValues) => {
    try {
      // Replace with your actual API endpoint
      const response = await axios.post('/api/educational-details', values);
      console.log('Form submitted successfully:', response.data);
      
      // Save form data and navigate to the next tab
      saveData(values);
      setActiveTab('3'); // Navigate to the Experience Details tab
    } catch (error) {
      console.error('Error submitting form:', error);
    }
      //   saveData(values);
      // setActiveTab('3'); // Navigate to the Experience Details tab
      //    console.log(values);
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: '100%' }}
      layout="vertical"
      className="px-12 mx my-4 grid grid-cols-2 bg-white shadow-2xl"
      onFinish={handleSubmit}
      onFinishFailed={(errorInfo) => {
        console.error('Validation Failed:', errorInfo);
      }}
    >
      <h2 className="text-xl font-bold mb-6 col-span-2">Educational Details</h2>

      {/* 10th Marks */}
      <Form.Item
        label="10th Marks"
        name="tenthMarks"
        rules={[{ required: true, message: 'Please input 10th Marks!' }]}
      >
        <InputNumber
          placeholder="Enter 10th Marks"
          maxLength={3}
          type="number"
          controls={false}
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      {/* 12th/Diploma Marks */}
      <Form.Item
        label="12th/Diploma Marks"
        name="twelfthMarks"
      >
        <Input
          placeholder="Enter 12th/Diploma Marks"
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      {/* UG Domain */}
      <Form.Item
        label="UG Domain"
        name="ugDomain"
        rules={[{ required: true, message: 'Please input UG Domain!' }]}
      >
        <Input
          placeholder="Enter UG Domain"
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      {/* UG Year of Passing */}
      <Form.Item
        label="UG Year of Passing"
        name="ugPassedOutYear"
        rules={[
          { required: true, message: 'Please input UG Year of Passing!' },
          { pattern: /^(19|20)\d{2}$/, message: 'Enter a valid year (e.g., 2020)' },
        ]}
      >
        <InputNumber
          placeholder="Enter UG Year of Passing"
          maxLength={4}
          type="number" 
          controls={false}
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      {/* PG Domain (Optional) */}
      <Form.Item
        label="PG Domain"
        name="pgDomain"
      >
        <Input
          placeholder="Enter PG Domain (Optional)"
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      {/* PG Year of Passing (Optional) */}
      <Form.Item
        label="PG Year of Passing"
        name="pgPassedOutYear"
        rules={[
          { pattern: /^(19|20)\d{2}$/, message: 'Enter a valid year (e.g., 2020)' },
        ]}
      >
        <InputNumber
          placeholder="Enter PG Year of Passing (Optional)"
          maxLength={4}
          type="number"
          controls={false}
          style={{ width: '70%', paddingBottom: '18px' }}
        />
      </Form.Item>

      {/* Submit Buttons */}
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
