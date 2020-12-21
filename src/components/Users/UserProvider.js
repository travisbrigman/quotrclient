import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState({ user: {first_name:"", last_name:""} })

  const getUsers = () => {
    return fetch("http://127.0.0.1:8000/users", {
      headers: {
        Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
      },
    })
      .then((res) => res.json())
      .then(setUsers);
  };

  const getCurrentUser = () => {
    return fetch(`http://localhost:8000/currentuser`, {
        headers: {
            Authorization: `Token ${localStorage.getItem("quotr_user_id")}`,
            "Content-Type": "application/json",
          }
    })
        .then(response => response.json())
        .then(setCurrentUser)    
}

  return (
    <UserContext.Provider
      value={{
        getUsers,
        users,
        setUsers,
        getCurrentUser,
        currentUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
