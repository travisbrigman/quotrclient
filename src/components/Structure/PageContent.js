import React from "react";
import { pages } from "./Pages";
import { AppIdentity } from "./AppIdentity";
import { Box, Header, Heading } from "grommet";
import { PropTypes } from "prop-types";
import { PartsCatalog } from "../Catalog/PartsCatalog";
import { SearchBar } from "../Catalog/SearchBar"
import { Proposals } from "../Proposals/Proposals";
import { Users } from "../Users/Users";
import { Customers } from "../Customers/Customers";
import { Route, Switch } from "react-router-dom";
import { AddCatalogItem } from "../Catalog/AddCatalogItem";

export const PageContent = ({ activeItem }) => {
  const { content, name } = pages[activeItem];
  // const items = new Array(9).fill(); // Mock data

  return (
    pages && (
      <Box flex overflow="auto">
        <Header
          fill="horizontal"
          height="xsmall"
          pad={{ horizontal: "medium" }}
        >
          <AppIdentity name={name} />
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
          </Switch>
        </Box>
      </Box>
    )
  );
};

PageContent.propTypes = {
  activeItem: PropTypes.number,
};
