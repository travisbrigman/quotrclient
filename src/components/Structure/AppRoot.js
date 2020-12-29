import { useContext, useState } from "react";
import { ResponsiveContext, Sidebar } from "grommet";
import { AppContainer } from "./AppContainer";
import { MainNavigation } from "./MainNavigation";
import { PageContent } from "./PageContent";
import { CatalogProvider } from "../Catalog/CatalogProvider";
import { ProposalProvider } from "../Proposals/ProposalProvider";
import { CustomerProvider } from "../Customers/CustomerProvider";
import { UserAvatar } from "./UserAvatar";
import { UserProvider } from "../Users/UserProvider";
import { Route } from "react-router-dom";
import { CustomerProposal } from "../Proposals/CustomerProposal";

export const AppRoot = () => {
  const [activeItem, setActiveItem] = useState(1);
  const size = useContext(ResponsiveContext);

  return (
    <AppContainer activeItem={activeItem}>
      <UserProvider>
        <Sidebar
          /* Sidebar should switch from column to row orientation 
        when on smaller screens */
          direction={size !== "small" ? "column" : "row"}
          /* Only display most critical navigation items in mobile 
        contexts */
          footer={
            size !== "small" && <UserAvatar setActiveItem={setActiveItem} />
          }
          /* Min height is not needed in mobile contexts */
          height={size !== "small" ? { min: "100%" } : undefined}
          align="center"
          background="background-back"
          pad={{
            top: size !== "small" ? "medium" : "small",
            bottom: "medium",
            horizontal: size !== "small" ? "medium" : "small",
          }}
        >
          <MainNavigation
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        </Sidebar>
      </UserProvider>
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
