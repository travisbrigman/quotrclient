import {Box, Button, Drop,Heading, ResponsiveContext, Text} from 'grommet'
import { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types';
import { pages } from './Pages';

export const NavButton = ({ active, icon, name, label, ...rest }) => {
  const ref = useRef();
  const size = useContext(ResponsiveContext);

  return (
    <Box fill="horizontal">
      <Button
        ref={ref}
        icon={icon}
        label={label}
        {...rest}
      />
    </Box>
  );
};

NavButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.element,
  name: PropTypes.string,
};