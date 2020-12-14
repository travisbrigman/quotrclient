import { Route, Redirect, Switch } from "react-router-dom";
import { Box, Button, Heading, ResponsiveContext } from "grommet";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Home } from "./components/Home";
import { PartsCatalog } from "./components/PartsCatalog";
import { Proposals } from "./components/Proposals";
import { Logout } from "grommet-icons";
import AppHeader from "./components/AppHeader/AppHeader";
import { useState } from "react";
import { StaticSideBar } from "./components/StaticSideBar/Sidebar";

export const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <Box fill>
          <AppHeader>
            <Heading level="3" margin="none">
              Quotr
            </Heading>
            <Button
              icon={<Logout />}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </AppHeader>
        <Box direction="row" fill>
          <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
            <StaticSideBar />
          </Box>
          <Route
            exact
            path="/home"
            render={(props, size) => <Home {...props} />}
          />
          <Switch>
            <Route
              exact
              path="/catalog"
              render={(props, size) => <PartsCatalog {...props} />}
            />
            <Route
              exact
              path="/proposals"
              render={(props, size) => <Proposals {...props} />}
            />
          </Switch>
          </Box>
          <Route
            path="/login"
            render={(props) => {
              if (localStorage.getItem("quotr_user_id")) {
                return <Redirect to="/home" />;
              } else {
                return <Login {...props} />;
              }
            }}
          />

          <Route
            path="/register"
            render={(props) => {
              if (localStorage.getItem("quotr_user_id")) {
                return <Redirect to="/home" />;
              } else {
                return <Register {...props} />;
              }
            }}
          />
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};
