import React, { useState } from "react";

export const CatalogContext = React.createContext();

export const CatalogProvider = (props) => {
  const [items, setItems] = useState([]);

  const getItems = () => {
    return fetch("http://localhost:8000/items", {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setItems);
  };

  return (
    <CatalogContext.Provider
      value={{
        getItems,
        items,
        setItems,
      }}
    >
      {props.children}
    </CatalogContext.Provider>
  );
};
