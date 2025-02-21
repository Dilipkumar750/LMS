import React, { useState } from 'react';
import { Button, Form, Upload, message, Row, Col, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadDocuments } from './api'; // Import the API function

interface DocumentProps {
  setActiveTab: (key: string) => void;
}

const Documents: React.FC<DocumentProps> = ({ setActiveTab }) => {
  const [form] = Form.useForm();

  const [fileLists, setFileLists] = useState<{
    [key: string]: UploadFile[];
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
    const isAllowedType = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ].includes(file.type);
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
    { name: 'previousCompanyOfferLetter', label: 'Previous Company Offer Letter', maxCount: 1 },
    { name: 'previousCompanyReleavingLetter', label: 'Previous Company Releaving Letter', maxCount: 1 },
    { name: 'experienceLetter', label: 'Experience Letter', maxCount: 1 },
    { name: 'payslip', label: 'Payslip', maxCount: 1 },
  ];

  const handleFinish = async () => {
    try {
      // Prepare form data for submission
      const formData = new FormData();
      for (const field in fileLists) {
        fileLists[field].forEach((file) => {
          if (file.originFileObj) {
            formData.append(field, file.originFileObj);
          }
        });
      }

      // Dynamic URL example
      const apiUrl = `/api/documents/upload`; // Replace with your API endpoint

      // Call API
      await uploadDocuments(apiUrl, formData);
      setActiveTab('5'); // Navigate to the next tab
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ maxWidth: '100%' }}
      className="px-12 mx my-4 bg-white shadow-2xl"
      onFinish={handleFinish}
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
                  ? undefined
                  : [{ required: true, message: `Please upload your ${label}!` }]
              }
            >
              <Upload
                beforeUpload={beforeUpload}
                listType="text"
                maxCount={maxCount}
                onPreview={handlePreview}
                onChange={handleChange(name)}
                fileList={fileLists[name]}
              >
                <Button icon={<UploadOutlined />} size="large" style={{ width: '100%' }}>
                  Upload {label}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        ))}
      </Row>

      <div className="col-span-2 flex justify-between  mb-10">
        <Button
          type="default"
          htmlType="button"
          onClick={() => setActiveTab('3')}
          style={{ width: '150px' }}
          className="mb-10"
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

export default Documents;
