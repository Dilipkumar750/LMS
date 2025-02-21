import axios from "axios";
import { environment } from "../../environments/environment";

//Vendor
 export const getAllVendors = async () => {
    return await axios.get(`${environment.apiPort}/vendor/all`);
  };


  export const getProfileDetailById = async (id: string) => {
    return await axios.get(`${environment.apiPort}/vendor/${id}`);
  };

  
