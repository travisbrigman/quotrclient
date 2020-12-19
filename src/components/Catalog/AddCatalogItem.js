import {
  Box,
  Button,
  FormField,
  Heading,
  Layer,
  TextInput,
  TextArea,
} from "grommet";
import { Add, Close, Edit, Update } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { CatalogContext } from "./CatalogProvider.js";
import { ModalContext } from "./PartsCatalog.js";
import { SingleEditPopUp } from "./SingleEditPopup.js";

export const AddCatalogItem = (props) => {
  const {
    createItem,
    getItems,
    getSingleItem,
    checked,
    setChecked,
    updateItem,
  } = useContext(CatalogContext);

  //modal glue
  const [editMode, setEditMode] = useState(false);
  var jsonDate = new Date().toJSON();
  const [state, setState] = useState({ created_on: jsonDate });

  const onClose = () => {
    setOpen(undefined);
    if (editMode) {
      setEditMode(false);
      setState({ created_on: jsonDate });
    }
  };
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);

  const [viewSingleEdit, setViewSingleEdit ] = useState(false)

  useEffect(() => {
      if (editMode) {  
          getSingleItem(checked[0]).then(setState);
      }
  }, [checked, editMode]);

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  console.log(checked.length);
  

  const handleClick = () => {
    if (editMode) {
      updateItem({
        id: state.id,
        make: state.make,
        model: state.model,
        cost: state.cost,
        margin: state.margin,
        description: state.description,
        image_url: state.image_url,
        created_on: jsonDate,
      })
        .then(setChecked([]))
        .then(getItems);
      setEditMode(false);
    } else {
      createItem(state);
    }
    onClose();
    setState({ created_on: jsonDate });
  };

  return (
    <>
      <Button icon={<Add />} label="Add" onClick={onOpen} />
      <Button
        icon={<Edit />}
        label="Edit"
        onClick={() => {
          setEditMode(true);
          onOpen();
          if (checked.length > 1) {
            setViewSingleEdit(true)
        }
        }}
      />
      <Box align="end" justify="center" pad="small">
        {open && (
          <Layer
            position="top"
            full="horizontal"
            modal
            onClickOutside={onClose}
            onEsc={onClose}
          >
            <Box fill="horizontal" overflow="auto" width="medium" pad="medium">
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
      <SingleEditPopUp viewSingleEdit={viewSingleEdit} setViewSingleEdit={setViewSingleEdit}/>
    </>
  );
};
