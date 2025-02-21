import axios from "axios";
import { environment } from "../environments/environment";

export const LoginCheckApi = async () => {
 
  return await axios({
    method: "get",
    url: `${environment.apiPort}/auth/get-user-info` ,
    data: {}
  });
};

