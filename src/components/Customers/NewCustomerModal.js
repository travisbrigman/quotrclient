import { useContext, useState } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  TextInput,
} from "grommet";
import { CustomerContext } from "./CustomerProvider";
import { ProposalContext } from "../Proposals/ProposalProvider";
import { CantDelete } from "./CantDelete";

export const NewCustomerModal = (
  { open, onClose, editMode, setEditMode, customerId },
  props
) => {
  const {
    createCustomer,
    getCustomers,
    customerInfo,
    setCustomerInfo,
    updateCustomer,
    deleteCustomer,
  } = useContext(CustomerContext);

  const { getProposalsByCustomer, proposals, setProposals } = useContext(
    ProposalContext
  );

  const [viewCantDelete, setViewCantDelete] = useState(false);

  function handleChange(evt) {
    const value = evt.target.value;
    setCustomerInfo({
      ...customerInfo,
      [evt.target.name]: value,
    });
  }

  const handleNewCustomer = (e) => {
    e.preventDefault();
    if (editMode) {
      updateCustomer({
        id: customerInfo.id,
        first_name: customerInfo.first_name,
        last_name: customerInfo.last_name,
        email: customerInfo.email,
        organization: customerInfo.organization,
      }).then(setCustomerInfo({}));
      setEditMode(false);
      onClose();
    } else {
      //TODO: This doesnt really work. fix to handle errors better
      if (Object.values(customerInfo).length === 0) {
        alert("not all fields filled out!");
      } else {
        createCustomer(customerInfo).then(getCustomers());
        onClose();
        setCustomerInfo({});
      }
    }
  };

  const deleteClicked = () => {
    getProposalsByCustomer(customerId)
    .then( () => {

      if (proposals.length === 0) {
        deleteCustomer(customerId);
        onClose();
      } else {
        setViewCantDelete(true);
      }
    }
    )

    setProposals([]);
  };

  const modalMessage = editMode ? "Edit Customer Info" : "Create New Customer";
  const buttonText = editMode ? "Update" : "Create";
  return (
    <>
      {open && (
        <Layer
          onEsc={onClose}
          onClickOutside={onClose}
          responsive={true}
          position="center"
        >
          <CantDelete
            viewCantDelete={viewCantDelete}
            setViewCantDelete={setViewCantDelete}
          />
          <Box margin="xsmall">
            <Heading margin="xsmall" level="3">
              {modalMessage}
            </Heading>
            <Form>
              <FormField label="first name" htmlFor="first-name">
                <TextInput
                  name="first_name"
                  type="text"
                  value={customerInfo.first_name}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField label="last name">
                <TextInput
                  name="last_name"
                  value={customerInfo.last_name}
                  onChange={handleChange}
                />
              </FormField>
              <FormField label="email">
                <TextInput
                  name="email"
                  value={customerInfo.email}
                  onChange={handleChange}
                />
              </FormField>
              <FormField label="organization">
                <TextInput
                  name="organization"
                  value={customerInfo.organization}
                  onChange={handleChange}
                />
              </FormField>
            </Form>
            <Box direction="row-responsive">
              <Button
                primary
                margin="small"
                label={buttonText}
                onClick={handleNewCustomer}
              />
              <Button
                secondary
                margin="small"
                label="Cancel"
                onClick={onClose}
              />
              {editMode && (
                <Button
                  secondary
                  margin="small"
                  label="delete"
                  onClick={() => {
                    deleteClicked();
                  }}
                />
              )}
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
