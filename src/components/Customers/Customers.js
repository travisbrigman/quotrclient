import { Heading } from "grommet";
import { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider.js";

export const Customers = () => {

    const { getCustomers, customers } = useContext(CustomerContext)

    useEffect(() => {
        getCustomers()
    },[]);

    console.log(customers);
    

    return (

        <Heading>Customers</Heading>
    )
}