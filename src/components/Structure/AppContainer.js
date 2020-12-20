import React from "react"
import {Box, ResponsiveContext} from "grommet"

export const AppContainer = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction={size === 'small' ? 'column-reverse' : 'row'}
      background="background-back"
      height={size === 'small' ? { max: 'large' } : undefined}
      width={size === 'small' ? 'medium' : '100%'}
      {...rest}
    />
  );
};