import { Box, Button, DataTable, Heading } from "grommet";
import { useContext, useEffect, useState } from "react"
import { CustomerContext } from "./CustomerProvider.js";
import { columns } from "./CustomerColums.js"
import { NewCustomerModal } from "./NewCustomerModal.js";

export const Customers = () => {
      //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => {setOpen(undefined)
                         setEditMode(false)};
  const [editMode, setEditMode ] = useState(false)
  const [clickedId, setClickedId] = useState(0)

    const { getCustomers, customers, getSingleCustomer, setCustomerInfo } = useContext(CustomerContext)

    const editCustomer = (customerId) => {
        setClickedId(customerId)
        getSingleCustomer(customerId)
        setEditMode(true)
        onOpen()
    }

    const newCustomer = () => {
        setCustomerInfo({})
        onOpen()
    }


    useEffect(() => {
        getCustomers()
    },[]);


    return (

        <Box direction="column" pad="small">

        <NewCustomerModal open={open} onClose={onClose} editMode={editMode} setEditMode={setEditMode} customerId={clickedId}/>

        <DataTable columns={columns} data={customers} onClickRow={event => editCustomer(event.datum.id)} sortable/>
        <Button label="add new customer" onClick={newCustomer}/>
        </Box>
    )
}