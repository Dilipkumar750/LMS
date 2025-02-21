import React from 'react';
import { Button, Form, Input, InputNumber, message } from 'antd';
import axios from 'axios'; // Import axios

interface AddressProps {
  setActiveTab: (key: string) => void; // Prop to update active tab
  saveData: (values: any) => void; // Add saveData to the props
}

const Address: React.FC<AddressProps> = ({ setActiveTab, saveData }) => {
  const [form] = Form.useForm();

  // Handle form submission and send data via axios
  const handleFinish = async (values: any) => {
    // try {
      // Log form data (for debugging)
      console.log('Address Details:', values);

      // Prepare data for submission (e.g., you might want to structure it differently)
      const addressData = {
        permanentAddress: values.permanentAddress,
        presentAddress: values.presentAddress,
        city: values.city,
        state: values.state,
        country: values.country,
        zipcode: values.zipcode,
      };

      // Save data using the saveData function
      saveData(addressData);

      // Send data to backend via axios POST request
    //   const response = await axios.post('/api/save-address', addressData, {
    //     headers: {
    //       'Content-Type': 'application/json', // Ensure the backend accepts JSON
    //     },
    //   });

    //   // Check response and handle success
    //   if (response.status === 200) {
    //     message.success('Address saved successfully!'); // Show success message
    //     setActiveTab('6'); // Move to the next tab (Bank Details)
    //   } else {
    //     message.error('Failed to save address');
    //   }
    // } catch (error) {
    //   console.error('Error submitting address:', error);
    //   message.error('An error occurred while saving the address');
    // }
    setActiveTab('6');
    saveData(addressData);
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: '100%' }}
      layout="vertical"
      className="px-12 mx my-4 grid grid-cols-2 bg-white shadow-2xl"
      onFinish={handleFinish} // Trigger handleFinish on form submit
    >
      <h2 className="text-xl font-bold mb-6 col-span-2 space-x-4">Address Details</h2>

      {/* Permanent Address */}
      <Form.Item
        label={<span className="font-medium text-[16px]">Permanent Address</span>}
        name="permanentAddress"
      >
        <Input.TextArea
          rows={3}
          placeholder="Enter Permanent Address"
          style={{ width: '90%' }}
        />
      </Form.Item>

      {/* Present Address */}
      <Form.Item
        label={<span className="font-medium text-[16px]">Present Address</span>}
        name="presentAddress"
        rules={[{ required: true, message: 'Please enter your Present Address' }]}
      >
        <Input.TextArea
          rows={3}
          placeholder="Enter Present Address"
          style={{ width: '90%' }}
        />
      </Form.Item>

      {/* City */}
      <Form.Item
        label={<span className="font-medium text-[16px]">City</span>}
        name="city"
        rules={[{ required: true, message: 'Please enter your City' }]}
      >
        <Input placeholder="Enter City" style={{ paddingBottom: '18px', width: '90%' }} />
      </Form.Item>

      {/* State */}
      <Form.Item
        label={<span className="font-medium text-[16px]">State</span>}
        name="state"
        rules={[{ required: true, message: 'Please enter your State' }]}
      >
        <Input placeholder="Enter State" style={{ paddingBottom: '18px', width: '90%' }} />
      </Form.Item>

      {/* Country */}
      <Form.Item
        label={<span className="font-medium text-[16px]">Country</span>}
        name="country"
        rules={[{ required: true, message: 'Please enter your Country' }]}
      >
        <Input placeholder="Enter Country" style={{ paddingBottom: '18px', width: '90%' }} />
      </Form.Item>

      {/* Zip Code */}
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
          type="number"
          controls={false}
          style={{ paddingBottom: '18px', width: '90%' }}
        />
      </Form.Item>

      <div className="col-span-2 flex justify-between mt-6 mb-5">
        {/* Previous Button */}
        <Button
          type="default"
          htmlType="button"
          onClick={() => setActiveTab('4')} // Switch to Documents page (4th tab)
          style={{ width: '150px' }}
        >
          Previous
        </Button>

        {/* Next Button */}
        <Button
          type="primary"
          htmlType="submit" // Trigger handleFinish on form submission
          style={{ width: '150px' }}
        >
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Address;
