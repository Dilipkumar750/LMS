import React from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import { submitBankDetails } from './api'; // Import the API function

interface BankDetailsProps {
  setActiveTab: (key: string) => void;
}

const BankDetails: React.FC<BankDetailsProps> = ({ setActiveTab }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      await submitBankDetails(values); // Call the API function
      setActiveTab('7'); // Move to the next tab
    } catch (error) {
      console.error('Error while submitting Bank Details:', error);
    }
  };

  const handleFinishFailed = (errorInfo: any) => {
    message.error('Validation failed. Please correct the errors and try again.');
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: '100%' }}
      layout="vertical"
      className="px-12 mx my-4 grid grid-cols-2 bg-white shadow-2xl"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
    >
      <h2 className="text-xl font-bold mb-6 col-span-2">Bank Details</h2>

      <Form.Item
        label={<span className="font-medium text-[16px]">Account Name</span>}
        name="accountName"
        rules={[{ required: true, message: 'Please enter Account Name' }]}
      >
        <Input style={{ width: '70%', paddingBottom: '18px' }} placeholder="Enter Account Name" />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Account Number</span>}
        name="accountNumber"
        rules={[
          { required: true, message: 'Please enter Account Number' },
          { pattern: /^[0-9]{12,14}$/, message: 'Please enter a valid Account Number (12-14 digits)' },
        ]}
      >
        <InputNumber
          style={{ width: '70%', paddingBottom: '18px' }}
          controls={false}
          placeholder="Enter Account Number"
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Bank Branch</span>}
        name="bankBranch"
        rules={[{ required: true, message: 'Please enter Bank Branch' }]}
      >
        <Input style={{ width: '70%', paddingBottom: '18px' }} placeholder="Enter Bank Branch" />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">IFS Code</span>}
        name="IFScode"
        rules={[
          { required: true, message: 'Please enter IFSC Code' },
          { pattern: /^[A-Za-z]{4}[0-9]{7}$/, message: 'Please enter a valid IFSC Code' },
        ]}
      >
        <Input style={{ width: '70%', paddingBottom: '18px' }} placeholder="Enter IFSC Code" />
      </Form.Item>

      <div className="col-span-2 flex justify-between mb-6">
        <Button
          type="default"
          htmlType="button"
          style={{ width: '7%' }}
          onClick={() => setActiveTab('5')}
        >
          Previous
        </Button>
        <Button type="primary" htmlType="submit" style={{ width: '7%' }}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default BankDetails;
