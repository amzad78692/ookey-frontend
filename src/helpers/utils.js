// import SummaryApi from "./src/common";
import SummaryApi from "../common";

export const fetchUserCategoryByPincode = async (pincode) => {
    const urlWithQuery = `${SummaryApi.getCategoriesByPincode.url}?pincode=${pincode}`;
          const response = await fetch(urlWithQuery, {
            method: SummaryApi.getCategoriesByPincode.method,
            credentials: 'include',
          });

          const categoryData = await response.json()
          return categoryData
}