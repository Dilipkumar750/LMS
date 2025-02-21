import { useEffect, useState } from "react";

import { SubCategory } from "..";
import Drawer from "../../../common-components/drawer";
import { Category } from "../../category";
import { createSubCategory, getAllCategories, updateSubCategory } from "../api";
import Swal from "sweetalert2";

interface ModifySubCategoryPropType {
  toggleDrawerVisible: () => void;
  editData: SubCategory | null;
  isDrawerVisible: boolean;
  setEditData: React.Dispatch<React.SetStateAction<SubCategory | null>>;
}

export interface SubCategoryDetails {
  categoryId: string;
  title: string;
}

export const ModifySubCategory: React.FC<ModifySubCategoryPropType> = ({
  toggleDrawerVisible,
  editData,
  isDrawerVisible,
  setEditData,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategory, setSubCategory] = useState<SubCategoryDetails>({
    categoryId: "",
    title: "",
  });

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const result = await getAllCategories();
      if (result?.data?.length) {
        setCategories(result.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const onChangeCategoryValue = (e: string, name: string) => {
    setSubCategory((prev) => ({
      ...prev,
      [name]: e,
    }));
  };

  useEffect(() => {
    if (!editData?._id) return;
    // setSubCategory(editData?.title || "");
  }, [editData]);

  const onSubmit = async () => {
    try {
      if (editData?._id) {

        console.log(editData._id)
        
        await updateSubCategory(editData?._id, subCategory)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Sub Category updated successfully!",
            });

            setSubCategory({
              categoryId: "",
              title: "",
            });
            toggleDrawerVisible();
          })
          .catch((error: any) => {
            console.error(
              "Error updating category:",
              error.response?.data || error
            );
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response?.data || error.message,
            });
          });
      } else {
        await createSubCategory(subCategory)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Sub category created successfully!",
            });

            setSubCategory({
              categoryId: "",
              title: "",
            });
            toggleDrawerVisible();
          })
          .catch((error: any) => {
            console.error(
              "Error creating category:",
              error.response?.data || error
            );
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.response?.data || error.message,
            });
          });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <Drawer
      open={isDrawerVisible}
      onClose={() => {
        toggleDrawerVisible();
        setEditData(null);
      }}
    >
      <h5 className="mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
        Create Sub Category
      </h5>

      <form>
        <div className="mb-4">
          <div tabIndex={0} className="w-full">
            <select
              id="countries"
              value={subCategory?.categoryId}
              title="category"
              onChange={(e) =>
                onChangeCategoryValue(e?.target?.value, "categoryId")
              }
              className=" bg-white border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a category</option>
              {categories?.map((value, key) => (
                <option value={value?._id}>{value?.title}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <div tabIndex={0} className="w-full">
            <input
              type="text"
              placeholder="Title"
              value={subCategory?.title}
              onChange={(e) => onChangeCategoryValue(e?.target?.value, "title")}
              className="w-full bg-white border border-gray-300 p-2 rounded-md shadow-sm mt-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={toggleDrawerVisible}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </Drawer>
  );
};
