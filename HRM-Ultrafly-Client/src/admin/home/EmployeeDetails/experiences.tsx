import React from 'react';
import { Button, Form, Input, DatePicker, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';  // Import axios

// Update the prop interface to include 'saveData'
interface ExperiencesDetailsProps {
  setActiveTab: (key: string) => void;
  saveData: (values: any) => void;  // Add the saveData prop
}

const ExperiencesDetails: React.FC<ExperiencesDetailsProps> = ({ setActiveTab, saveData }) => {
  const [form] = Form.useForm();

  // Function to handle form submission
  const handleFinish = async (values: any) => {
    try {
    //  Log the form values
     // console.log('Submitted Experiences:', values);

     // Send the data via axios (if needed)
      const response = await axios.post('/api/experiences', values);

     // Save the data using the saveData prop
      saveData(values); // Pass the values to saveData in the parent component

     // Switch to the Documents Details tab after successful submission
      setActiveTab('4');

    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally handle error (e.g., show error message to user)
    }
    // setActiveTab('4');
    // saveData(values);
    //  console.log('Submitted Experiences:', values);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      style={{ maxWidth: '100%' }}
      className="p-6 bg-white shadow-2xl"
    >
      <h2 className="text-xl font-bold mb-4">Course Details</h2>

      {/* Dynamic Form List for Experiences */}
      <Form.List name="experiences">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'companyName']}
                  label={<span className="font-medium text-[16px]">Company Name</span>}
                >
                  <Input placeholder="Company Name" style={{ width: '200px' }} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'jobDescription']}
                  label={<span className="font-medium text-[16px]">Job Destination</span>}
                >
                  <Input placeholder="Job Destination" style={{ width: '200px' }} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'startDate']}
                  label={<span className="font-medium text-[16px]">Start Date</span>}
                >
                  <DatePicker style={{ width: '150px' }} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'eventDate']}
                  label={<span className="font-medium text-[16px]">Event Date</span>}
                >
                  <DatePicker style={{ width: '150px' }} />
                </Form.Item>

                <MinusCircleOutlined
                  onClick={() => remove(name)}
                  style={{ color: 'red', fontSize: '18px', cursor: 'pointer' }}
                />
              </Space>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                className="mt-4"
              >
                Add Experience
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* Previous and Next Buttons */}
      <div className="flex justify-between mt-6">
        <Button 
          type="default" 
          onClick={() => setActiveTab('2')} // Switch to Educational Details tab
          style={{ width: '150px' }}
        >
          Previous
        </Button>
        <Button 
          type="primary" 
          htmlType="submit" 
          style={{ width: '150px' }}
        >
          Next
        </Button>
      </div>
    </Form>
  );
};

export default ExperiencesDetails;
