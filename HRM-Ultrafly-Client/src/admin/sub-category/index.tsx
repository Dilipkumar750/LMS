import { useState } from "react";

import { Status } from "../../common-components/interface";
import { Announcement } from "./all-sub-category";
import { ModifySubCategory } from "./modify-sub-category";

export interface SubCategory {
  _id?: string;
  archived: boolean;
  archivedAt?: Date;
  title: string;
  status: Status;
  categoryId: {
    _id: string;
    status: Status;
    title: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const SubCategoryInfo: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const toggleDrawerVisible = () => setIsDrawerVisible((prev) => !prev);
  const [editData, setEditData] = useState<SubCategory | null>(null);
  const [search, setSearch] = useState<string>("");

  const onClickCreate = () => {
    setEditData(null);
    toggleDrawerVisible();
  };

  const onClickEdit = (editData: any) => {
    setEditData(editData);
    toggleDrawerVisible();
  };

  const extraButton = (
    <button
      type="button"
      onClick={onClickCreate}
      style={{ width: "10%", marginTop: "10px" }}
      className="absolute top-2 right-2 text-white bg-green-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-auto py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Add
    </button>
  );

  return (
    <>
      <div className="relative bg-white shadow-lg rounded-lg border border-gray-200 p-6 mb-4 dark:bg-gray-800 dark:border-gray-700">
        {/* {extraButton} */}

        {/* <ModifySubCategory
          toggleDrawerVisible={toggleDrawerVisible}
          editData={editData}
          isDrawerVisible={isDrawerVisible}
          setEditData={setEditData}
        /> */}

        {/* <SubCategoryList onClickEdit={onClickEdit} search={search} /> */}
      </div>
    </>
  );
};
