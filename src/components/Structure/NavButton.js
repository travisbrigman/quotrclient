import {Box, Button} from 'grommet'
import { useRef } from 'react'
import PropTypes from 'prop-types';

//button component used to build up main navigation

export const NavButton = ({ active, icon, name, label, ...rest }) => {
  const ref = useRef();

  return (
    <Box fill="horizontal">
      <Button
        ref={ref}
        icon={icon}
        label={<Box alignContent="end">{label}</Box>}
        {...rest}
        plain={true}
      />
    </Box>
  );
};

NavButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.element,
  name: PropTypes.string,
};