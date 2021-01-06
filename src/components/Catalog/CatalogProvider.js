import { createContext, useState } from "react";

export const CatalogContext = createContext();

export const CatalogProvider = (props) => {
  const [items, setItems] = useState([]);
  const [singleItem, setSingleItem] = useState({});
  const [checked, setChecked] = useState([]);
  const [status, setStatus ] = useState(false)
  const [searchTerms, setTerms ] = useState('')
  const [valueMultiple, setValueMultiple] = useState([]);
 

  const getItems = () => {
    return fetch("http://127.0.0.1:8000/items", {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setItems);
  };

  const getItemsByMake = (make) => {
    return fetch(`http://127.0.0.1:8000/items?make=${make}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setItems);
  };

  const getSingleItem = (itemId) => {
    return fetch(`http://127.0.0.1:8000/items/${itemId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then((returnedItem) => {
        setSingleItem(returnedItem);
        return returnedItem;
      });
  };

  const addItemToProposal = (proposalItem) => {
    return fetch("http://127.0.0.1:8000/proposalitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
      body: JSON.stringify(proposalItem),
    })
    .then((res) => {
      setStatus(res.ok)
      res.json()
    })
  };

  const patchItem = (itemObject) => {
    return fetch(`http://localhost:8000/items/${itemObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
      body: JSON.stringify(itemObject),
    }).then(getItems);
  };

  const updateItem = (itemObject) => {
    return fetch(`http://localhost:8000/items/${itemObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
      body: JSON.stringify(itemObject),
    }).then(getItems);
  };

  const createItem = (newItem) => {
    return fetch("http://127.0.0.1:8000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
      body: JSON.stringify(newItem),
    }).then((res) => res.json()).then(getItems);
  };

  const deleteCatalogItem = (itemId) => {
    return fetch(`http://127.0.0.1:8000/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
      body: JSON.stringify(itemId),
    }).then(getItems);
  }

  return (
    <CatalogContext.Provider
      value={{
        getItems,
        items,
        setItems,
        addItemToProposal,
        patchItem,
        createItem,
        updateItem,
        getSingleItem,
        setSingleItem,
        singleItem,
        checked,
        setChecked,
        status,
        setStatus,
        searchTerms,
        setTerms,
        valueMultiple,
        setValueMultiple,
        getItemsByMake,
        deleteCatalogItem
      }}
    >
      {props.children}
    </CatalogContext.Provider>
  );
};
