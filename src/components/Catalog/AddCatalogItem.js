import {
  Box,
  Button,
  CheckBox,
  DataTable,
  Form,
  FormField,
  Heading,
  Layer,
  MaskedInput,
  TextInput,
  Select,
  TextArea,
} from "grommet";
import { Add, Close } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { CatalogContext } from "./CatalogProvider.js";

export const AddCatalogItem = () => {
  const { createItem } = useContext(CatalogContext);
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState("");

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const defaultValue = {
    make: '',
    model: '',
    description: '',
    margin: 0,
    cost: 0,
    image_url: '',
  };

  var jsonDate = (new Date()).toJSON();

  const [state, setState] = useState({created_on: jsonDate})

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  
console.log(state);


  return (
    <>
      <Box align="end" justify="center" pad="small">
        <Button icon={<Add />} label="Add" onClick={onOpen} />
        {open && (
          <Layer
            position="top"
            full="horizontal"
            modal
            onClickOutside={onClose}
            onEsc={onClose}
          >
            <Box
              as="form"
              fill="horizontal"
              overflow="auto"
              width="medium"
              pad="medium"
              onSubmit={onClose}
            >
              <Box flex={false} direction="row" justify="between">
                <Heading level={3} margin="none">
                  Add
                </Heading>
                <Button icon={<Close />} onClick={onClose} />
              </Box>
                <Box flex="grow" overflow="auto" pad={{ vertical: "medium" }}>
                    <Box direction="row-responsive" gap="small">
                  <FormField label="Manufacturer">
                    <TextInput name="make" value={state.make} onChange={handleChange} />
                  </FormField>
                  <FormField label="Model">
                    <TextInput name="model" value={state.model} onChange={handleChange} />
                  </FormField>
                  <FormField label="Cost">
                    <TextInput name="cost" value={state.cost} onChange={handleChange} />
                  </FormField>
                  <FormField label="Margin">
                    <TextInput name="margin" value={state.margin} onChange={handleChange} />
                  </FormField>
                    </Box>
                  <FormField label="Description">
                    <TextArea name="description" value={state.description} onChange={handleChange} />
                  </FormField>
                  <FormField label="Image">
                    <TextInput name="image_url" value={state.image_url} onChange={handleChange} />
                  </FormField>
                </Box>
                <Box flex={false} as="footer" align="start">
                  <Button
                    label="Submit"
                    onClick={()=>{createItem(state).then(onClose());setState({}) }}
                    primary
                  />
                </Box>
            </Box>
          </Layer>
        )}
      </Box>
    </>
  );
};
