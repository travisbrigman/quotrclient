import {Box, Button, Drop, ResponsiveContext, Text} from 'grommet'
import React, { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types';

export const NavButton = ({ active, icon, name, ...rest }) => {
  const [hover, setHover] = React.useState();
  const ref = React.useRef();
  const size = React.useContext(ResponsiveContext);

  return (
    <Box fill="horizontal">
      <Button
        ref={ref}
        icon={icon}
        onMouseOver={() => setHover(true)}
        onFocus={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onBlur={() => setHover(false)}
        {...rest}
      />
      {
        /* Show tooltip on hover and focus states as a supplemental
      reminder to icon's meaning */
        ref.current && hover && (
          <Drop
            align={size !== 'small' ? { left: 'right' } : { top: 'bottom' }}
            target={ref.current}
            plain
          >
            <Box
              animation={{ type: ['fadeIn', 'slideRight'] }}
              elevation="small"
              margin={{ left: 'xsmall', vertical: 'xxsmall' }}
              pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
              background="blue"
              round="xsmall"
            >
              <Text size="small" color="text-strong">
                {name}
              </Text>
            </Box>
          </Drop>
        )
      }
    </Box>
  );
};

NavButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.element,
  name: PropTypes.string,
};