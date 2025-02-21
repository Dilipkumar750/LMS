import axios from "axios";
import { environment } from "../../environments/environment";
import { SubCategoryDetails } from "./modify-sub-category";

export const CreateCategory = async (title: string) => {
    return await axios.post(`${environment.apiPort}/category/create`, {
      title
    });
  };


  export const getAllCategories = async () => {
    return await axios.get(`${environment.apiPort}/category/get-all`);
  };


  export const updateCategory = async (id: string, title: string) => {
    return await axios.post(`${environment.apiPort}/category/update/${id}`, { title });
  };

  //Sub Category//
  export const createSubCategory = async (subCategory: SubCategoryDetails) => {
    return await axios.post(`${environment.apiPort}/sub-category/create`, subCategory);
  };


  export const updateSubCategory = async (id: string, subCategory: SubCategoryDetails) => {
    return await axios.post(`${environment.apiPort}/sub-category/update/${id}`, subCategory);
  };

  export const getAllSubCategories = async () => {
    return await axios.get(`${environment.apiPort}/sub-category/get-all`);
  };
