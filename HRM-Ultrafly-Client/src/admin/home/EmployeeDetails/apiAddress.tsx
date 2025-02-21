import React from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import axios from 'axios';

interface AddressProps {
  setActiveTab: (key: string) => void;
}

const Address: React.FC<AddressProps> = ({ setActiveTab }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      const response = await axios.post('/api/address', values);
      if (response.status === 200) {
        message.success('Address details submitted successfully');
        setActiveTab('6');
      } else {
        message.error('Failed to submit address details');
      }
    } catch (error: any) {
      message.error(
        error.response?.data?.message || 'An error occurred while submitting the form'
      );
    }
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: '100%' }}
      layout="vertical"
      className="px-12 mx my-4 grid grid-cols-2 bg-white shadow-2xl"
      onFinish={handleFinish}
    >
      <h2 className="text-xl font-bold mb-6 col-span-2 space-x-4">Address Details</h2>

      <Form.Item
        label={<span className="font-medium text-[16px]">Permanent Address</span>}
        name="permanentAddress"
      >
        <Input.TextArea rows={3} placeholder="Enter Permanent Address" style={{ width: '90%' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Present Address</span>}
        name="presentAddress"
        rules={[{ required: true, message: 'Please enter your Present Address' }]}
      >
        <Input.TextArea rows={3} placeholder="Enter Present Address" style={{ width: '90%' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">City</span>}
        name="city"
        rules={[{ required: true, message: 'Please enter your City' }]}
      >
        <Input placeholder="Enter City" style={{ paddingBottom: '18px', width: '90%' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">State</span>}
        name="state"
        rules={[{ required: true, message: 'Please enter your State' }]}
      >
        <Input placeholder="Enter State" style={{ paddingBottom: '18px', width: '90%' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Country</span>}
        name="country"
        rules={[{ required: true, message: 'Please enter your Country' }]}
      >
        <Input placeholder="Enter Country" style={{ paddingBottom: '18px', width: '90%' }} />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Zip Code</span>}
        name="zipcode"
        rules={[
          { required: true, message: 'Please enter your Zip Code' },
          { pattern: /^[0-9]{5,6}$/, message: 'Please enter a valid Zip Code' },
        ]}
      >
        <InputNumber
          placeholder="Enter Zip Code"
          maxLength={10}
          controls={false}
          style={{ paddingBottom: '18px', width: '90%' }}
        />
      </Form.Item>

      <div className="col-span-2 flex justify-between mt-6 mb-5">
        <Button type="default" htmlType="button" onClick={() => setActiveTab('4')} style={{ width: '150px' }}>
          Previous
        </Button>
        <Button type="primary" htmlType="submit" style={{ width: '150px' }}>
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Address;
