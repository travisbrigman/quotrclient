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

  const addItemToProposal = (proposalItem) => {
    return fetch("http://127.0.0.1:8000/proposalitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`
      },
      body: JSON.stringify(proposalItem)
    })
    .then(res => res.json())
  }

  return (
    <CatalogContext.Provider
      value={{
        getItems,
        items,
        setItems,
        addItemToProposal
      }}
    >
      {props.children}
    </CatalogContext.Provider>
  );
};
