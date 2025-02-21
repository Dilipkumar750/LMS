import axios from "axios";
import { environment } from "../../environments/environment";

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
  

