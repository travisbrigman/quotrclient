import React from "react";
import { Box, Heading, Text } from "grommet";
import { Edit } from "grommet-icons";
import { PropTypes } from "prop-types";
// basicall the header bar of the app
export const AppIdentity = ({ name }) => {
  return (
    <Box
      direction="row"
      align="center"
      gap="medium"
      // pad maintains accessible hit target
      // non-responsive maintains same dimensions for mobile
      pad={{ vertical: "small" }}
      responsive={false}
    >
      <Edit color="brand" />
      <Box direction="row" gap="xsmall" wrap align="baseline">
        <Heading level="4" color="text-strong" weight="bold">
          Quotr
        </Heading>
        <Text color="text-strong">{name}</Text>
      </Box>
    </Box>
  );
};
AppIdentity.propTypes = {
  name: PropTypes.string,
};
