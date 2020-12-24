import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Layer,
  MaskedInput,
  Text
} from "grommet";

export const EditLineItem = ({ open, setOpen, editLineItem }) => {
  const [marginValue, setMarginValue] = useState(0);

  const handleClick = () => {
    editLineItem((marginValue/100));
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
          <Box alignSelf="center" direction="row" align="center" gap="xxsmall" width="xsmall">
            <MaskedInput
              name="value"
              mask={[{ length: [1,2], regexp: /^\d{1,3}$/, placeholder:'25' }]}
              value={marginValue}
              onChange={(event) => setMarginValue(event.target.value)}
            /><Text weight="bold">%</Text>
            </Box>

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
