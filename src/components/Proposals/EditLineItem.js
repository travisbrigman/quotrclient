import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  MaskedInput,
  Text,
} from "grommet";

export const EditLineItem = ({ open, setOpen, editLineItem }) => {
  const [marginValue, setMarginValue] = useState(0);

  const handleClick = () => {
    editLineItem(marginValue);
    setMarginValue(0)
  };

  return (
    <>
      {open && (
        <Layer
          onEsc={() => {
            setOpen(false);
          }}
          onClickOutside={() => {
            setOpen(false);
          }}
          responsive={true}
          position="center"
        >
          <Box margin="xsmall">
            <Heading margin="xsmall" level="3">
              Set Margin
            </Heading>

            <MaskedInput
              name="value"
              mask={[{ regexp: /^\d{1,3}$/ }]}
              value={marginValue}
              onChange={(event) => setMarginValue(event.target.value)}
            />

            <Box direction="row-responsive">
              <Button
                secondary
                margin="small"
                label="Cancel"
                onClick={() => {
                  setOpen(false);
                }}
              />
              <Button
                primary
                margin="small"
                label="Make Change"
                onClick={handleClick}
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
