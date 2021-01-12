import { Box, Button, Layer, Text, MaskedInput } from "grommet";
import { FormClose, Send } from "grommet-icons";
//popup to add quantity of selected item

export const QuantityPopup = ({
  viewQuantityPopup,
  setViewQuantityPopup,
  quant,
  setQuant,
  approvedChecked,
}) => {
  const handleClick = () => {
    approvedChecked();
    setViewQuantityPopup(false);
  };
  return (
    <>
      {viewQuantityPopup && (
        <Layer
          position="center"
          modal={true}
          onEsc={() => {
            setViewQuantityPopup(false);
          }}
          onClickOutside={() => {
            setViewQuantityPopup(false);
          }}
          responsive={false}
        >
          <Box
            align="center"
            direction="column"
            gap="small"
            justify="between"
            round="xsmall"
            elevation="medium"
            pad={{ vertical: "xsmall", horizontal: "small" }}
          >
            <Box align="center" direction="column" gap="xsmall" pad="small">
              <Text>How many of each checked item?</Text>
              <MaskedInput
                name="value"
                mask={[{ regexp: /^\d{1,3}$/ }]}
                onChange={(event) => setQuant(event.target.value)}
              />
            </Box>
            <Box direction="row" gap="xsmall">
              <Button
                label="add to proposal"
                icon={<Send />}
                onClick={handleClick}
                primary
              />
              <Button
                label="cancel"
                icon={<FormClose />}
                onClick={() => {
                  setViewQuantityPopup(false);
                }}
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
