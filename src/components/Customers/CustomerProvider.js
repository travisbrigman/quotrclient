import { createContext, useState } from "react";

export const CustomerContext = createContext();

export const CustomerProvider = (props) => {
  const [customers, setCustomers] = useState();
  const [customerInfo, setCustomerInfo] = useState({});

  const getCustomers = () => {
    return fetch("http://127.0.0.1:8000/customers", {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setCustomers);
  };

  const createCustomer = (newCustomer) => {
    return fetch("http://127.0.0.1:8000/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`
      },
      body: JSON.stringify(newCustomer)
    })
      .then(res => res.json())
  }

  const getSingleCustomer = (customerId) => {
    return fetch(`http://127.0.0.1:8000/customers/${customerId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },      
    })
    .then((res) => res.json())
    .then((returnedItem) => {
      setCustomerInfo(returnedItem);
      return returnedItem;
    });
  }

  const updateCustomer = (customerObject) => {
    return fetch(`http://localhost:8000/customers/${customerObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
      body: JSON.stringify(customerObject),
    }).then(getCustomers);
  }


  return (
    <CustomerContext.Provider
      value={{
        getCustomers,
        customers,
        setCustomers,
        createCustomer,
        getSingleCustomer,
        customerInfo,
        setCustomerInfo,
        updateCustomer
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};
