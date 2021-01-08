import { useState } from "react";
import {Box, Button} from 'grommet'
import { useRef } from 'react'
import PropTypes from 'prop-types';

export const NavButton = ({ active, icon, name, label, ...rest }) => {
  const ref = useRef();
const [ hover, setHover ] = useState()

  return (
    <Box fill="horizontal">
      <Button
        ref={ref}
        icon={icon}
        label={<Box alignContent="end">{label}</Box>}
        {...rest}
        plain={true}
        onMouseOver={() => setHover(true)}
        onFocus={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onBlur={() => setHover(false)}
      />
    </Box>
  );
};

NavButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.element,
  name: PropTypes.string,
};