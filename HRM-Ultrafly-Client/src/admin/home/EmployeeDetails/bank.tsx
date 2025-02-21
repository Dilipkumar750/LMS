import React from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import axios from 'axios'; // Import Axios

interface BankDetailsProps {
  setActiveTab: (key: string) => void;
  saveData: (values: BankFormValues) => void; // Add saveData function
}

// Define a type for form values
interface BankFormValues {
  accountName: string;
  accountNumber: string;
  bankBranch: string;
  IFScode: string;
}

const BankDetails: React.FC<BankDetailsProps> = ({ setActiveTab, saveData }) => {
  const [form] = Form.useForm();

  // Handle form submission
  const handleFinish = async (values: BankFormValues) => {
    try {
      // API request with Axios to save bank details
      const response = await axios.post('/api/bank-details', values); // Replace with your actual endpoint
      if (response.status === 200) {
        message.success('Form submitted successfully!');
        console.log('Form Values: ', values);
        console.log('Server Response: ', response.data);
        saveData(values); // Call the saveData function here
        setActiveTab('7'); // Assuming the next tab after Bank Details is tab '7'
      } else {
        message.error('Failed to submit the form.');
        console.log('Server Error Response:', response);
      }
    } catch (error) {
      message.error('An error occurred while submitting the form.');
      console.error('Error:', error);
    }
    // saveData(values); // Call the saveData function here
    // setActiveTab('7'); // Assuming the next tab after Bank Details is tab '7'
  };

  // Handle form submission failure (validation errors)
  const handleFinishFailed = (errorInfo: any) => {
    message.error('Please fill in all required fields.');
    console.log('Validation Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: '100%' }}
      layout="vertical"
      className="px-12 mx my-4 grid grid-cols-2 bg-white shadow-2xl"
      onFinish={handleFinish} // Trigger onFinish when form is valid and submitted
      onFinishFailed={handleFinishFailed} // Handle failure to submit (validation errors)
    >
      <h2 className="text-xl font-bold mb-6 col-span-2">Bank Details</h2>

      <Form.Item
        label={<span className="font-medium text-[16px]">Account Holdername</span>}
        name="accountName"
        rules={[{  message: 'Please enter Account Name' }]}
      >
        <Input
          style={{ width: '70%', paddingBottom: '18px' }}
          placeholder="Enter Account Name"
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Account Number</span>}
        name="accountNumber"
        rules={[
          // { message: 'Please enter Account Number' },
          {
           
            pattern: /^[0-9]{12,14}$/,
            message: 'Please enter a valid Account Number',
          },
        ]}
      >
        <InputNumber
          style={{ width: '70%', paddingBottom: '18px' }}
          maxLength={14}
          type="number"
          controls={false}
          placeholder="Enter Account Number"
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">Bank Branch</span>}
        name="bankBranch"
        rules={[{ message: 'Please enter Bank Branch' }]}
      >
        <Input
          style={{ width: '70%', paddingBottom: '18px' }}
          placeholder="Enter Bank Branch"
        />
      </Form.Item>

      <Form.Item
        label={<span className="font-medium text-[16px]">IFS Code</span>}
        name="IFScode"
        rules={[{  message: 'Please enter IFSC Code' }]}
      >
        <Input
          style={{ width: '70%', paddingBottom: '18px' }}
          placeholder="Enter IFSC Code"
        />
      </Form.Item>

      {/* Previous and Next Buttons */}
      <div className="col-span-2 flex justify-between mb-6">
        {/* Previous Button */}
        <Button
          type="default"
          htmlType="button"
          style={{ width: '7%' }}
          onClick={() => setActiveTab('5')} // Go to the "Address" tab (key '5')
        >
          Previous
        </Button>

        {/* Submit Button */}
        <Button type="primary" htmlType="submit" style={{ width: '7%' }}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default BankDetails;
