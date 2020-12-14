import React from "react";
import {Avatar,Button,Nav, Sidebar} from "grommet"
import { Catalog, Clipboard } from "grommet-icons";

export const StaticSideBar = () => {

    return (
    <Sidebar background="brand" footer={<Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />} >

<Nav gap="small">
        <Button icon={<Catalog/>} hoverIndicator />
        <Button icon={<Clipboard/>} hoverIndicator />
      </Nav>

    </Sidebar>
    )
};
