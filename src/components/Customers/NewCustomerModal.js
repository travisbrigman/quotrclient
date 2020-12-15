import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  Text,
  TextInput,
} from "grommet";
import { CustomerContext } from "./CustomerProvider";

export const NewCustomerModal = ({ open, onClose }, props) => {
  const history = useHistory();

  const [state, setState] = useState({});

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const { createCustomer } = useContext(CustomerContext);

  const handleNewCustomer = (e) => {
    e.preventDefault();

//TODO: This doesnt really work. fix to handle errors better
    if (Object.values(state).length === 0) {
        
      alert("not all fields filled out!");
      
    } else {
      createCustomer(state)
      onClose();
      setState({})
    }
  };

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
              Create New Customer
            </Heading>
            <Form >
              <FormField label="first name" htmlFor="first-name">
                <TextInput
                  name="first_name"
                  type="text"
                  value={state.first_name}
                  onChange={handleChange}
                  required
                />
              </FormField>
              <FormField label="last name">
                <TextInput
                  name="last_name"
                  value={state.last_name}
                  onChange={handleChange}
                />
              </FormField>
              <FormField label="email">
                <TextInput
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </FormField>
              <FormField label="organization">
                <TextInput
                  name="organization"
                  value={state.organization}
                  onChange={handleChange}
                />
              </FormField>
            </Form>
            <Box direction="row-responsive">
              <Button primary margin="small" label="Create" onClick={handleNewCustomer} />
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
