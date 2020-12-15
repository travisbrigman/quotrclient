import React from "react";
import { Avatar, Button, Nav, Sidebar } from "grommet";
import { Catalog, Clipboard, Group, User } from "grommet-icons";
import { Link, Route } from "react-router-dom"
import{PartsCatalog} from "../Catalog/PartsCatalog.js"

export const StaticSideBar = () => {

  const src = "//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"
  return (
    <Sidebar
      background="brand"
      footer={
        <Link to="/users">
        <Avatar src={src == undefined ? <User background="backgroud-contrast"/> : src} />
        </Link>
      }
    >
      <Nav gap="small">
        
        <Link to="/catalog"><Button icon={<Catalog />} hoverIndicator /></Link>
        <Link to="/proposals"><Button icon={<Clipboard />} hoverIndicator /></Link>
        <Link to="/customers"><Button icon={<Group />} hoverIndicator /></Link>
        
      </Nav>
    </Sidebar>
  );
};
