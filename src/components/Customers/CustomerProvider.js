import { createContext, useState } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
  const [customers, setCustomers] = useState();

  const getCustomers = () => {
    return fetch("http://127.0.0.1:8000/customers", {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setCustomers);
  };

  return (
    <CustomerContext.Provider
      value={{
        getCustomers,
        customers,
        setCustomers,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};
