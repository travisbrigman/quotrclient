import { useContext } from "react";
import { Box, ResponsiveContext } from "grommet";

//sets constraints for the main app view
export const AppContainer = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);

  return (
      <Box
        direction={size === "small" ? "column-reverse" : "row"}
        background="background"
        height={size === "small" ? { max: "large" } : undefined}
        width={size === "small" ? "medium" : "100%"}
        fill
        {...rest}
      />

  );
};
