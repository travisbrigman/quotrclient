import { Box, Button, Heading } from "grommet";
import { useState } from "react";
import { Notification } from "grommet-icons";
import AppHeader from "./AppHeader/AppHeader";
import AppSidebar from "./AppSidebar/AppSidebar";

export const Home = (props, size) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Box fill>
        <AppHeader>
          <Heading level="3" margin="none">
            My App
          </Heading>
          <Button
            icon={<Notification />}
            onClick={() => setShowSidebar(!showSidebar)}
          />
        </AppHeader>
        <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
          <Box flex align="center" justify="center">
            app body
          </Box>
          <AppSidebar
            size={size}
            showSidebar={showSidebar}
            onClose={() => setShowSidebar(false)}
          >
            sidebar
          </AppSidebar>
        </Box>
      </Box>
    </>
  );
};
