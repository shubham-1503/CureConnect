import axios from 'axios';
import _ from 'lodash';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


class ApiRequest {

  static headers() {
    const userData=JSON.parse(localStorage.getItem("userInfo"));
    let headers = { 'Content-Type': 'application/json' };
    if (userData.token) headers = { ...headers, 'Authorization': `Bearer ${userData.token}` };
    return headers;
  }

  
  static async fetch(options, silentErrorToast = true) {
    options.headers = _.merge(this.headers(), options.headers);
    // const navigate = useNavigate();
    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      const errorMessages = error.response && error.response.data ;
      const errorCode = error.response && error.response.status;

    //   this.error(errorMessages, errorCode, silentErrorToast);
      const errorRes = { errorMessages, errorCode }
      throw errorRes;
    }
  }
}

export { ApiRequest };