import { createContext, useContext, useReducer, useEffect } from "react";
import customerReducer from "../reducers/customerReducer";
import API from "../api/axios";

const CustomerStateContext = createContext(null);
const CustomerDispatchContext = createContext(null);

const initialState = {
  addresses: [],
  orders: [],
};

export default function CustomerProvider({ children }) {
  const [state, dispatch] = useReducer(customerReducer, initialState);
  // ✅ AUTO LOAD addresses globally
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await API.get("/customer/addresses");

      dispatch({
        type: "set_addresses",
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("customer_data", JSON.stringify(state));
  }, [state]);

  return (
    <CustomerStateContext.Provider value={state}>
      <CustomerDispatchContext.Provider value={dispatch}>
        {children}
      </CustomerDispatchContext.Provider>
    </CustomerStateContext.Provider>
  );
}

export const useCustomer = () => useContext(CustomerStateContext);
export const useCustomerDispatch = () => useContext(CustomerDispatchContext);
