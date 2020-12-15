import { Box, Button, DataTable, Heading, List } from "grommet";
import { useContext, useEffect, useState } from "react"
import { CustomerContext } from "./CustomerProvider.js";
import { columns } from "./CustomerColums.js"
import { NewCustomerModal } from "./NewCustomerModal.js";

export const Customers = () => {
      //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

    const { getCustomers, customers } = useContext(CustomerContext)

    useEffect(() => {
        getCustomers()
    },[]);

    console.log(customers);
    

    return (

        <Box direction="column" pad="small">
        <Heading>Customers</Heading>

        <NewCustomerModal open={open} onClose={onClose}/>

        <DataTable columns={columns} data={customers} onClickRow={event => console.log(event.datum)} sortable/>
        <Button label="add new customer" onClick={() => {onOpen()}}/>
        </Box>
    )
}