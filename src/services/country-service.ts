import { ROUTE_API } from "constants/routes";
import RequestUtil from "utils/request-util";

const COUNTRY_API = {
  getCountry: async () => {
    const response = await RequestUtil.get<ICountry.Country[]>(
      ROUTE_API.countryList,
      {
        params: {
          fields: "flags,name,cca2,cca3,altSpellings,idd",
        },
      }
    );
    return response.data;
  },
};

export default COUNTRY_API;
