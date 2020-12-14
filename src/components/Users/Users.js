import { Heading } from "grommet";
import { useContext, useEffect } from "react"
import { UserContext } from "./UserProvider.js"

export const Users = () => {

    const { getUsers, users } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    },[]);

    console.log(users);
    return (
        <Heading>USERS</Heading>
    )
}