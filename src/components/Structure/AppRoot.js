import React from "react";
import { Avatar, ResponsiveContext, Sidebar } from "grommet";

import { AppContainer } from "./AppContainer";
import { MainNavigation } from "./MainNavigation";
import { PageContent } from "./PageContent";
import { CatalogProvider } from "../Catalog/CatalogProvider";
import { ProposalProvider } from "../Proposals/ProposalProvider";
import { CustomerProvider } from "../Customers/CustomerProvider";

export const AppRoot = () => {
  const [activeItem, setActiveItem] = React.useState(1);
  const size = React.useContext(ResponsiveContext);

  return (
    <AppContainer activeItem={activeItem}>
      <Sidebar
        /* Sidebar should switch from column to row orientation 
        when on smaller screens */
        direction={size !== "small" ? "column" : "row"}
        /* Only display most critical navigation items in mobile 
        contexts */
        header={size !== "small" && <SidebarHeader />}
        /* Min height is not needed in mobile contexts */
        height={size !== "small" ? { min: "100%" } : undefined}
        align="center"
        background="brand"
        pad={{
          top: size !== "small" ? "medium" : "small",
          bottom: "medium",
          horizontal: size !== "small" ? "medium" : "small",
        }}
      >
        <MainNavigation activeItem={activeItem} setActiveItem={setActiveItem} />
      </Sidebar>
      <CustomerProvider>
        <ProposalProvider>
          <CatalogProvider>
            <PageContent
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </CatalogProvider>
        </ProposalProvider>
      </CustomerProvider>
    </AppContainer>
  );
};

const SidebarHeader = () => <Avatar background="background">DS</Avatar>;
