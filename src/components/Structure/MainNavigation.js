import { useContext } from "react";
import PropTypes from "prop-types";
import { Anchor, Nav, ResponsiveContext } from "grommet";
import { NavButton } from "./NavButton";
import { pages } from "./Pages";
import { Link } from "react-router-dom";

export const MainNavigation = ({ activeItem, setActiveItem }, props) => {
  const size = useContext(ResponsiveContext);
  const maxItems = size !== "small" ? undefined : 4;

  return (
    <Nav direction={size !== "small" ? "column" : "row"}>
      {pages &&
        pages.slice(0, maxItems).map((item, index) => (
            <Anchor
            key={index}
            as={({ colorProp, hasIcon, hasLabel, focus, ...p }) => <Link {...p} />}
            {...props}
           to={item.path}>
            <NavButton
              key={item.name}
              a11yTitle={item.name}
              active={index === activeItem}
              icon={item.icon}
              name={item.name}
              label={item.name}
              onClick={() => setActiveItem(index)}
              round="xsmall"
            />
          </Anchor>
        ))}
    </Nav>
  );
};

MainNavigation.propTypes = {
  activeItem: PropTypes.number,
  setActiveItem: PropTypes.func,
};
