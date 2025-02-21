import React from 'react';
import { Button, Form, Input, DatePicker, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { submitExperienceDetails } from './api'; // Import the API function

interface ExperiencesDetailsProps {
  setActiveTab: (key: string) => void;
}

const ExperiencesDetails: React.FC<ExperiencesDetailsProps> = ({ setActiveTab }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    try {
      const apiUrl = '/api/experience-details'; // Replace with your actual endpoint
      await submitExperienceDetails(apiUrl, values);
      setActiveTab('4'); // Switch to the next tab
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      style={{ maxWidth: '100%' }}
      className="p-6 bg-white shadow-2xl"
    >
      <h2 className="text-xl font-bold mb-4">Experiences Details</h2>

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
                  rules={[{ required: true, message: 'Please input the company name!' }]}
                >
                  <Input placeholder="Company Name" style={{ width: '200px' }} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'jobDestinations']}
                  label={<span className="font-medium text-[16px]">Job Destination</span>}
                  rules={[{ required: true, message: 'Please input the job destination!' }]}
                >
                  <Input placeholder="Job Destination" style={{ width: '200px' }} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'startDate']}
                  label={<span className="font-medium text-[16px]">Start Date</span>}
                  rules={[{ required: true, message: 'Please select the start date!' }]}
                >
                  <DatePicker style={{ width: '150px' }} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'endDate']}
                  label={<span className="font-medium text-[16px]">End Date</span>}
                  rules={[{ required: true, message: 'Please select the end date!' }]}
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
        <Button type="primary" htmlType="submit" style={{ width: '150px' }}>
          Next
        </Button>
      </div>
    </Form>
  );
};

export default ExperiencesDetails;
