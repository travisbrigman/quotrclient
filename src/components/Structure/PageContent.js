import React from "react";
import { pages } from "./Pages";
import { AppIdentity } from "./AppIdentity";
import { Box, Button, Header, Heading } from "grommet";
import { Logout } from "grommet-icons";
import { PropTypes } from "prop-types";
import { PartsCatalog } from "../Catalog/PartsCatalog";
import { Proposals } from "../Proposals/Proposals";
import { Users } from "../Users/Users";
import { Customers } from "../Customers/Customers";
import { Route, Switch, useHistory } from "react-router-dom";
import { AddCatalogItem } from "../Catalog/AddCatalogItem";
import { CustomerProposal } from "../Proposals/CustomerProposal";
import { PartsCatalogRT } from "../Catalog/PartsCatalogRT";

export const PageContent = ({ activeItem }) => {
  const { name } = pages[activeItem];
  const history = useHistory();

  return (
    pages && (
      <Box flex overflow="auto">
        <Header
          fill="horizontal"
          height="xsmall"
          pad={{ horizontal: "medium" }}
        >
          <AppIdentity name={name} />
          {localStorage.getItem("quotr_user_id") != null ? (
            <Box alignSelf="baseline">
              <Button
                icon={<Logout />}
                onClick={() => {
                  localStorage.removeItem("quotr_user_id");
                  history.push({ pathname: "/login" });
                }}
              />
            </Box>
          ) : null}
        </Header>
        <Box pad={{ horizontal: "medium", bottom: "large" }} flex="grow">
          <Heading level={2} margin={{ vertical: "small" }}>
            {name}
          </Heading>
          <Switch>
            <Route
              exact
              path="/catalog"
              render={(props, size) => (
                <Box direction="column">
                  <AddCatalogItem />
                  <PartsCatalog {...props} />
                  <PartsCatalogRT {...props} />
                </Box>
              )}
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
            <Route
              exact
              path="/export"
              render={(props) => <CustomerProposal {...props} />}
            />
          </Switch>
        </Box>
      </Box>
    )
  );
};

PageContent.propTypes = {
  activeItem: PropTypes.number,
};
