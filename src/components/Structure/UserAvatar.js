import { Avatar } from "grommet";
import { useEffect, useContext } from "react";
import { UserContext } from "../Users/UserProvider";

export const SidebarHeader = () => {
  const { currentUser, getCurrentUser } = useContext(UserContext);

  useEffect(() => {
    getCurrentUser();
  }, []);


  const firstInitial = currentUser.user.first_name.charAt(0)
  const lastInitial = currentUser.user.last_name.charAt(0)

  return (
       <Avatar background="brand" >{firstInitial + ' ' + lastInitial}</Avatar>
  )
};
