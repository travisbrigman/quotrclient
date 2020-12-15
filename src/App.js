import { Link, Route, Redirect, Switch, useHistory } from "react-router-dom";
import { Anchor, Box, Button, Heading, ResponsiveContext } from "grommet";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { PartsCatalog } from "./components/Catalog/PartsCatalog";
import { Proposals } from "./components/Proposals";
import { Logout } from "grommet-icons";
import AppHeader from "./components/AppHeader/AppHeader";
import { StaticSideBar } from "./components/StaticSideBar/Sidebar";
import { CatalogProvider } from "./components/Catalog/CatalogProvider";
import { CustomerProvider } from "./components/Customers/CustomerProvider";
import { UserProvider } from "./components/Users/UserProvider";
import { Customers } from "./components/Customers/Customers";
import { Users } from "./components/Users/Users";

export const App = () => {
  const history = useHistory();

  return (
    <ResponsiveContext.Consumer>
      {(size) => (
        <>
          <Box fill>
            <AppHeader>
              <Heading level="3" margin="none">
                Quotr
              </Heading>
              {localStorage.getItem("quotr_user_id") != null ? (
                <Button
                  icon={<Logout />}
                  onClick={() => {
                    localStorage.removeItem("quotr_user_id")
                    history.push({ pathname: "/login" })
                  }}
                />
              ) : (
                <>
                  <Anchor
                    as={Link}
                    className="nav-link"
                    to="/login"
                    label="Login"
                  />
                  <Anchor
                    as={Link}
                    className="nav-link"
                    to="/register"
                    label="Register"
                  />
                </>
              )}
            </AppHeader>
            <Box direction="row" fill>
              <Box direction="row">
                <CatalogProvider>

                <StaticSideBar />
                </CatalogProvider>
              </Box>
              <UserProvider>
                <CustomerProvider>
                  <CatalogProvider>
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
                      <Route
                        exact
                        path="/customers"
                        render={(props, size) => <Customers {...props} />}
                      />
                      <Route
                        exact
                        path="/users"
                        render={(props, size) => <Users {...props} />}
                      />
                    </Switch>
                  </CatalogProvider>
                </CustomerProvider>
              </UserProvider>
            </Box>
          </Box>
          
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};
