export const ROUTE_PATH = {
  root: "/",
  country: "/country",
};

export const ROUTE_API = {
  root: import.meta.env.VITE_REACT_API_URL,
  countryList: "/all",
  countryByName: "/name/:name",
};
