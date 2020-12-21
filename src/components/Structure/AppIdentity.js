import React from "react";
import { Box, Button, Text } from "grommet";
import { Edit } from "grommet-icons";
import { PropTypes } from "prop-types";

export const AppIdentity = ({ name }) => (
  <Button>
    <Box
      direction="row"
      align="start"
      gap="medium"
      // pad maintains accessible hit target
      // non-responsive maintains same dimensions for mobile
      pad={{ vertical: "small" }}
      responsive={false}
    >
      <Edit color="brand" />
      <Box direction="row" gap="xsmall" wrap>
        <Text color="text-strong" weight="bold">
          Quotr
        </Text>
        <Text color="text-strong">{name}</Text>
      </Box>
    </Box>
  </Button>
);

AppIdentity.propTypes = {
  name: PropTypes.string
};
