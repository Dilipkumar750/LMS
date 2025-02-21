import React, { useState } from "react";
import { ModifyCategory } from "./modify-category";
import { Status } from "../../common-components/interface";

// Interface for the `Category` type
export interface Category {
  _id?: string;
  archived: boolean;
  archivedAt?: Date;
  title: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

// Props for the `PayrollPage` component
export interface PayrollPageProps {
  onClickEdit: (editData: any) => void; // Function to handle edit click
  search: string; // Search string
}

// `PayrollPage` Component
const PayrollPage: React.FC<PayrollPageProps> = ({ onClickEdit, search }) => {
  // Example content for PayrollPage (add your actual logic here)
  return (
    <div>
      <h2>Payroll Page</h2>
      {/* Example to demonstrate onClickEdit usage */}
      <button onClick={() => onClickEdit({ id: 1, title: "Sample Edit" })}>
        Edit Item
      </button>
      <p>Search Query: {search}</p>
    </div>
  );
};

// `Category` Component
export const CategoryComponent: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [editData, setEditData] = useState<Category | null>(null);
  const [search, setSearch] = useState<string>("");

  const toggleDrawerVisible = () => setIsDrawerVisible((prev) => !prev);

  const onClickCreate = () => {
    setEditData(null);
    toggleDrawerVisible();
  };

  const onClickEdit = (editData: any) => {
    setEditData(editData);
    toggleDrawerVisible();
  };

  return (
    <div className="relative bg-white shadow-lg rounded-lg border border-gray-200 p-6 mb-4 dark:bg-gray-800 dark:border-gray-700">
      {/* Modify Category Drawer */}
      <ModifyCategory
        toggleDrawerVisible={toggleDrawerVisible}
        editData={editData}
        isDrawerVisible={isDrawerVisible}
        setEditData={setEditData}
      />

      {/* Payroll Page with Edit and Search Props */}
      <PayrollPage onClickEdit={onClickEdit} search={search} />
    </div>
  );
};
