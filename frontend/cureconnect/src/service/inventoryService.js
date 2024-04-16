
import { ApiRequest } from "../helpers/apiRequest"
const apiURL=import.meta.env.VITE_API_PATH

export const fetchAllMedicine = async () => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/inventory/all`,
            method: "GET",
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const deleteMedicine = async (medicineId) => {
    
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/inventory/delete/${medicineId}`,
            method: "DELETE",
        });
        return true;
    } catch (err) {
        throw err; 
    }
}

export const addOrUpdateMedicine = async (data) => {
    try {
        const res = await ApiRequest.fetch({
            url: apiURL + `/api/v1/inventory/add`,
            method: "POST",
            data
        });
        return res;
    } catch (err) {
        throw err; 
    }
}

export const updateInventoryAPI = async (data) => {
  try {
      const res = await ApiRequest.fetch({
          url: apiURL + `/api/v1/inventory/updateInventory`,
          method: "PUT",
          data
      });
      return res;
  } catch (err) {
      throw err; 
  }
}

export const fetchInventoryAPI = async (data) => {
  try {
      const res = await ApiRequest.fetch({
          url: apiURL + `/api/v1/inventory/fetchAll?medicines=${data}`,
          method: "GET",
      });
      return res;
  } catch (err) {
      throw err; 
  }
  
}