import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState();

  const getUsers = () => {
    return fetch("http://127.0.0.1:8000/users", {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setUsers);
  };

  return (
    <UserContext.Provider
      value={{
        getUsers,
        users,
        setUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
