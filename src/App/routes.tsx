import * as React from "react";
import { About } from "../About";
import { Home } from "../Home";
import { ProjectList } from "../ProjectList";
import { Contact } from "../Contact";

export interface IRoute {
  path: string;
  component: any;
}

export const routes: IRoute[] = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/projects", component: ProjectList },
  { path: "/Contact", component: Contact },
];
