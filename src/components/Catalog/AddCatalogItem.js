import {
  Box,
  Button,
  FormField,
  Heading,
  Layer,
  TextInput,
  TextArea,
} from "grommet";
import { Add, Close, Edit } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { CatalogContext } from "./CatalogProvider.js";

export const AddCatalogItem = (props) => {
  const { createItem, getSingleItem, checked, setChecked } = useContext(CatalogContext);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  var jsonDate = new Date().toJSON();

  const [state, setState] = useState({ created_on: jsonDate });

    if (editMode) {
      getSingleItem(checked[0]).then(setState);
    }

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  const handleClick = () => {
    if (editMode) {
      //stuff
    } else {
      createItem(state);
    }
    onClose();
    setState({});
  };

  return (
    <>
      <Box align="end" justify="center" pad="small">
        <Button icon={<Add />} label="Add" onClick={onOpen} />
        <Button
          icon={<Edit />}
          label="Edit"
          onClick={() => {
            onOpen();
            setEditMode(true);
          }}
        />
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
                    <TextInput
                      name="make"
                      value={state.make}
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField label="Model">
                    <TextInput
                      name="model"
                      value={state.model}
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField label="Cost">
                    <TextInput
                      name="cost"
                      value={state.cost}
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField label="Margin">
                    <TextInput
                      name="margin"
                      value={state.margin}
                      onChange={handleChange}
                    />
                  </FormField>
                </Box>
                <FormField label="Description">
                  <TextArea
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                  />
                </FormField>
                <FormField label="Image">
                  <TextInput
                    name="image_url"
                    value={state.image_url}
                    onChange={handleChange}
                  />
                </FormField>
              </Box>
              <Box flex={false} as="footer" align="start">
                <Button label="Submit" onClick={handleClick} primary />
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
    </>
  );
};
