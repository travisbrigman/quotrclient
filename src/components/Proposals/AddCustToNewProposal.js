import { useContext, useEffect } from "react";
import {
  Box,
  Button,
  DataTable,
  Heading,
  Layer,
} from "grommet";
import { CustomerContext } from "../Customers/CustomerProvider.js";
import { columns } from "../Customers/CustomerColums";

export const AddCustomerToProposal = ({ open, onClose, constructNewProposal }) => {

  const { getCustomers, customers } = useContext(CustomerContext);

  //fetches customer list
  useEffect(() => {
    getCustomers()
},[]);

//constructs a new empty proposal associated with a customer ID
const handleClick = (event) => {
constructNewProposal(event.datum.id)
onClose()
}

  return (
    <>
      {open && (
        <Layer
          onEsc={onClose}
          onClickOutside={onClose}
          responsive={true}
          position="center"
        >
          <Box margin="xsmall">
            <Heading margin="xsmall" level="3">
              Select Customer
            </Heading>
            <DataTable
              columns={columns}
              data={customers}
              onClickRow={handleClick}
            />

            <Box direction="row-responsive">
              <Button
                secondary
                margin="small"
                label="Cancel"
                onClick={onClose}
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
