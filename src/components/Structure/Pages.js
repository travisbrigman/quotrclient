import React from "react"

import {
    Catalog,
    Clipboard,
  Group,
} from 'grommet-icons';

export const pages = [
  {
    name: 'Catalog',
    icon: <Catalog />,
    path: '/catalog',
  },
  {
    name: 'Proposals',
    icon: <Clipboard />,
    path: '/proposals',
  },
  {
    name: 'Customers',
    icon: <Group />,
    path: '/customers',
  },
  {
    name: 'Users',
    path: '/users',
  }
];
