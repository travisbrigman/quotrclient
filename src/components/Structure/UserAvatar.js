import { Avatar, Button } from "grommet";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Users/UserProvider";

export const UserAvatar = ({ setActiveItem }, props) => {
  const { currentUser, getCurrentUser } = useContext(UserContext);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const firstInitial = currentUser.user.first_name.charAt(0);
  const lastInitial = currentUser.user.last_name.charAt(0);

  return (
    <Button
      as={({ colorProp, hasIcon, hasLabel, focus, ...p }) => <Link {...p} />}
      {...props}
      to="/users"
      onClick={() => setActiveItem(3)}
    >
      <Avatar background="brand">{firstInitial + " " + lastInitial}</Avatar>
    </Button>
  );
};
