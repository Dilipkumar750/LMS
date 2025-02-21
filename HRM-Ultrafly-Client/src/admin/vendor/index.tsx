import { useState } from "react";
import { VendorList } from "./vendor-list";
import { APPROVED_STATUS, Status } from "../../common-components/interface";

export interface Vendor {
  _id: string;
  userId: {
    _id: string
    name: string,
    email: string,
    mobile: string,
    status: Status
  };
  businessName: string;
  businessType: string;
  businessRegistrationNumber: string;
  taxIdentificationNumber?: string;
  businessLicenseNumber?: string;
  websiteURL?: string;
  registeredAddress?: string;
  operationalAddress?: string;
  productCategories?: string;
  brandNames?: string;
  status: APPROVED_STATUS;
  createdAt: Date;
}

export const VendorInfo: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const toggleDrawerVisible = () => setIsDrawerVisible((prev) => !prev);
  const [editData, setEditData] = useState<Vendor | null>(null);
  const [search, setSearch] = useState<string>("");

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
      <VendorList onClickEdit={onClickEdit} search={search} />
    </div>
  );
};
