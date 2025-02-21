import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Drawer from "../../../common-components/drawer";
import { CreateCategory, getAllCategories, updateCategory } from "../api";
import { Category } from "..";

interface ModifyCategoryPropType {
  toggleDrawerVisible: () => void;
  editData: Category | null;
  isDrawerVisible: boolean;
  setEditData: React.Dispatch<React.SetStateAction<Category | null>>;
}

export const ModifyCategory: React.FC<ModifyCategoryPropType> = ({
  toggleDrawerVisible,
  editData,
  isDrawerVisible,
  setEditData,
}) => {
  const [title, setTitle] = useState<string>("");

  const onChangeCategoryValue = (e: string) => {
    setTitle(e);
  };

  useEffect(() => {
    if (!editData?._id) return;

    setTitle(editData?.title || "");
  }, [editData]);

  const onSubmit = async () => {
    try {
      if (editData?._id) {
        await updateCategory(editData?._id, title)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Category updated successfully!",
            });
            setTitle("");
            toggleDrawerVisible();
          })
          .catch((error) => {
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
        await CreateCategory(title)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Category created successfully!",
            });
            setTitle("");
            toggleDrawerVisible();
          })
          .catch((error) => {
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
        Create Category
      </h5>

      <form>
        <div className="mb-4">
          <div tabIndex={0} className="w-full">
            <input
              type="text"
              placeholder="Category"
              value={title}
              onChange={(e) => onChangeCategoryValue(e?.target?.value)}
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
