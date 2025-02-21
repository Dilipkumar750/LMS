import React, { useState } from 'react';
import { Tabs, message } from 'antd';
import type { TabsProps } from 'antd';
import PersonalForm from './personal';
import EducationalDetails from './educationaldetails';
import ExperiencesDetails from './experiences';
import Address from './address';
import BankDetails from './bank';
import Document from './document';

const PersonalDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const [formData, setFormData] = useState<Record<string, any>>({});

  const updateFormData = (tabKey: string, values: Record<string, any>) => {
    setFormData((prevData) => ({
      ...prevData,
      [tabKey]: values,
    }));
  };

  const validateAndNavigate = async (
    currentTab: string,
    nextTab: string,
    validate: () => Promise<void>
  ) => {
    try {
      await validate();
      setActiveTab(nextTab);
    } catch {
      message.error('Please correct errors before proceeding.');
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Personal Details',
      children: (
        <PersonalForm
          setActiveTab={(key) => validateAndNavigate('1', key, () => Promise.resolve())}
          saveData={(values) => updateFormData('1', values)}
        />
      ),
    },
    {
      key: '2',
      label: 'Educational Details',
      children: (
        <EducationalDetails
          setActiveTab={(key) => validateAndNavigate('2', key, () => Promise.resolve())}
          saveData={(values) => updateFormData('2', values)}
        />
      ),
    },
    {
      key: '3',
      label: 'Course Details',
      children: (
        <ExperiencesDetails
          setActiveTab={(key) => validateAndNavigate('3', key, () => Promise.resolve())}
          saveData={(values) => updateFormData('3', values)}
        />
      ),
    },
    {
      key: '4',
      label: 'Document Details',
      children: (
        <Document
          setActiveTab={(key) => validateAndNavigate('4', key, () => Promise.resolve())}
          saveData={(values) => updateFormData('4', values)}
        />
      ),
    },
    {
      key: '5',
      label: 'Address Details',
      children: (
        <Address
          setActiveTab={(key) => validateAndNavigate('5', key, () => Promise.resolve())}
          saveData={(values) => updateFormData('5', values)}
        />
      ),
    },
    // {
    //   key: '6',
    //   label: 'Bank Details',
    //   children: (
    //     <BankDetails
    //       setActiveTab={(key) => validateAndNavigate('6', key, () => Promise.resolve())}
    //       saveData={(values) => updateFormData('6', values)}
    //     />
    //   ),
    // },
  ];

  return (
    <div className="px-10">
      <div className="custom-tabs bg-white p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Student Details</h1>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
      </div>
    </div>
  );
};

export default PersonalDetails;
