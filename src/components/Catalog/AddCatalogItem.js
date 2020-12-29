import {
  Box,
  Button,
  FormField,
  Heading,
  Layer,
  TextInput,
  TextArea,
  Menu,
} from "grommet";
import { Add, Close, Edit, New } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { CatalogContext } from "./CatalogProvider.js";
import { SelectToEdit } from "./SelectToEdit.js";
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

  const [viewSingleEdit, setViewSingleEdit] = useState(false);
  const [viewSelectToEdit, setViewSelectToEdit] = useState(false);

  useEffect(() => {
    if (editMode) {
      if (checked.length !== 0) {
        getSingleItem(checked[0]).then(setState);
      }
    }
  }, [checked, editMode]);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createItemImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      setState({
        ...state,
        [event.target.name]: base64ImageString,
      });
    });
  };

  function handleChange(evt) {
    if (evt.target.type === "file") {
      createItemImageString(evt);
    } else if (evt.target.type === "number") {
      setState({
        ...state,
        [evt.target.name]: parseFloat(evt.target.value),
      });
    } else {
        setState({
          ...state,
          [evt.target.name]: evt.target.value,
        });
    }
  }

  const handleClick = () => {
    if (editMode) {
      updateItem({
        id: state.id,
        make: state.make,
        model: state.model,
        cost: state.cost,
        margin: state.margin,
        description: state.description,
        image_path: state.image_path,
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

  const actionItems = [
    {
      label: <Box alignSelf="center">New</Box>,
      onClick: onOpen,
      icon: (
        <Box pad="medium">
          <New size="small" />
        </Box>
      ),
    },
    {
      label: <Box alignSelf="center">Edit</Box>,
      onClick: () => {
        setEditMode(true);
        if (checked.length === 0) {
          setViewSelectToEdit(true);
        } else {
          onOpen();
          if (checked.length > 1) {
            setViewSingleEdit(true);
          }
        }
      },
      icon: (
        <Box pad="medium">
          <Edit size="small" />
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box width="xsmall" size="xsmall" alignSelf="end">
        <Menu label="Actions" items={actionItems} />
      </Box>

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
                      type="number"
                      name="cost"
                      value={state.cost}
                      onChange={handleChange}
                    />
                  </FormField>
                  <FormField label="Margin">
                    <TextInput
                      type="number"
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
                  <input
                    type="file"
                    name="image_path"
                    id="item_image"
                    value={state.image_path}
                    onChange={handleChange}
                  />
                  {/* <TextInput
                    name="image_path"
                    value={state.image_url}
                    onChange={handleChange}
                  /> */}
                </FormField>
              </Box>
              <Box flex={false} as="footer" align="start">
                <Button label="Submit" onClick={handleClick} primary />
              </Box>
            </Box>
          </Layer>
        )}
      </Box>
      <SingleEditPopUp
        viewSingleEdit={viewSingleEdit}
        setViewSingleEdit={setViewSingleEdit}
      />
      <SelectToEdit
        viewSelectToEdit={viewSelectToEdit}
        setViewSelectToEdit={setViewSelectToEdit}
      />
    </>
  );
};
