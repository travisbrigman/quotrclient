import { Box, Button } from "grommet";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider.js";

export const Users = () => {
  const { currentUser, getUsers, getCurrentUser, users, patchUser } = useContext(
    UserContext
  );

  const [profileImageString, setProfileImageString] = useState("");
  useEffect(() => {
    getUsers();
    getCurrentUser();
  }, []);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createProfileImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      setProfileImageString(base64ImageString);
    });
  };

  const uploadProfileImage = () => {
    patchUser({id: currentUser.id, profile_image: profileImageString });
  };

  return (
    <Box>
      <Button label="upload" onClick={uploadProfileImage} />
      <input
        type="file"
        name="image_path"
        id="item_image"
        onChange={createProfileImageString}
      />
    </Box>
  );
};
