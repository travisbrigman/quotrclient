import { createContext, useState } from "react";

export const CatalogContext = createContext();

export const CatalogProvider = (props) => {
  const [items, setItems] = useState([]);

  const getItems = () => {
    return fetch("http://127.0.0.1:8000/items", {
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
