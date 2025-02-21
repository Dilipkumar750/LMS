import React, { useState } from 'react';
import { Button, Form, Upload, message, Row, Col, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';  // Import axios

interface DocumentProps {
  setActiveTab: (key: string) => void;
  saveData: (values: any) => void;  // Add saveData prop
}

const Documents: React.FC<DocumentProps> = ({ setActiveTab, saveData }) => {
  const [form] = Form.useForm();

  const [fileLists, setFileLists] = useState<{
    [key: string]: UploadFile[]; // Each field will have an array of UploadFile
  }>({
    aadharCard: [],
    panCard: [],
    ugDegreeOrMarksheet: [],
    pgDegreeCertificate: [],
    previousCompanyOfferLetter: [],
    previousCompanyReleavingLetter: [],
    experienceLetter: [],
    payslip: [],
  });

  const beforeUpload = (file: any) => {
    const isAllowedType =
      ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',].includes(
        file.type
      );
    if (!isAllowedType) {
      message.error('You can only upload PDF, DOC, DOCX, or TXT files!');
    }
    return isAllowedType;
  };

  const handlePreview = async (file: any) => {
    const fileUrl = file.url || URL.createObjectURL(file.originFileObj);
    window.open(fileUrl, '_blank');
  };

  const handleChange = (field: string) => ({ fileList }: any) => {
    setFileLists((prev) => ({ ...prev, [field]: fileList }));
  };

  const uploadFields = [
    { name: 'aadharCard', label: 'Aadhar Card', maxCount: 2 },
    { name: 'panCard', label: 'PAN Card', maxCount: 2 },
    { name: 'ugDegreeOrMarksheet', label: 'UG Degree Certificate / Marksheet', maxCount: 2 },
    { name: 'pgDegreeCertificate', label: 'PG Degree Certificate / Marksheet ', maxCount: 1 },
    // { name: 'previousCompanyOfferLetter', label: 'Previous Company Offer Letter', maxCount: 1 },
    // { name: 'previousCompanyReleavingLetter', label: 'Previous Company Releaving Letter', maxCount: 1 },
    // { name: 'experienceLetter', label: 'Experience Letter', maxCount: 1 },
    // { name: 'payslip', label: 'Payslip', maxCount: 1 },
  ];

  // Handle form submission and file upload using axios
  const handleFinish = async (values: any) => {
    try {
      // Prepare form data to send to backend
      const formData = new FormData();
  
      // Add each file list to formData
      Object.keys(fileLists).forEach((key) => {
        fileLists[key].forEach((file) => {
          const fileToSend = file.originFileObj || file.response || file; // Try using originFileObj or fallback to file directly
          formData.append(key, fileToSend);
        });
      });
  
      // Send form data to your backend using axios (replace with your actual API URL)
      const response = await axios.post('/api/upload-documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
  
      // Check if the response was successful (you can adjust this based on your backend response)
      if (response.status === 200) {
        message.success('Documents uploaded successfully!');
        
        // Save the form data via saveData prop
        saveData(values);
  
        // Navigate to the next tab after successful submission
        setActiveTab('5'); // Navigate to the Address tab (5th tab)
      } else {
        message.error('Failed to upload documents');
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
      message.error('An error occurred while uploading the documents');
    }
    // saveData(values);
    //     setActiveTab('5');
    //     console.log(values)
  };
  
  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: '100%' }}
      className="px-12 mx my-4 bg-white shadow-2xl"
      onFinish={handleFinish} // Handle form submission
    >
      <h2 className="text-xl font-bold mb-6" style={{ fontSize: '18px' }}>
        Document Upload
      </h2>

      <Row gutter={[24, 16]}>
        {uploadFields.map(({ name, label, maxCount }) => (
          <Col span={12} key={name}>
            <Form.Item
              label={label}
              name={name}
              rules={
                ['pgDegreeCertificate', 'previousCompanyOfferLetter', 'previousCompanyReleavingLetter', 'experienceLetter', 'payslip'].includes(name)
                  ? undefined // No rules for optional fields
                  : [{ required: true, message: `Please upload your ${label}!` }]
              }
            >
              <Upload
                beforeUpload={beforeUpload}
                listType="text"
                maxCount={maxCount}
                onPreview={handlePreview}
                onChange={handleChange(name)}
                fileList={fileLists[name]} // This will now correctly type to UploadFile[]
              >
                <Button icon={<UploadOutlined />} size="large" style={{ width: '100%' }}>
                  Upload {label}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        ))}
      </Row>

      <div className="col-span-2 flex justify-between mb-10">
        {/* Previous Button */}
        <Button
          type="default"
          htmlType="button"
          onClick={() => setActiveTab('3')} // Navigate to Experience page (3rd tab)
          style={{ width: '150px' }}
          className="mb-10"
        >
          Previous
        </Button>

        {/* Next Button */}
        <Button
          type="primary"
          htmlType="submit" // Trigger form submission
          style={{ width: '150px' }}
        >
          Next
        </Button>
      </div>
    </Form>
  );
};

export default Documents;
