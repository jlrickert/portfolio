import * as React from "react";
import {
  BrowserRouter,
  Redirect,
  Route as RouterRoute,
  Switch,
  match,
  withRouter,
} from "react-router-dom";
import { History, Location } from "history";

import { Container } from "../Container";
import { Background } from "../Background";
import { Header } from "../Header";
import { Home } from "../Home";
import { About } from "../About";
import { Portfolio } from "../Portfolio";
import { Contact } from "../Contact";

import * as Styles from "./app.module.css";

export interface RouteData {
  text: string;
  path: string;
  component: any;
  active?: boolean;
}

export interface Props {
  location: Location;
  history: History;
}

export interface State {
  isLoading: boolean;
}

class _App extends React.Component<Props, State> {
  public state: State = {
    isLoading: true,
  };

  public render(): React.ReactElement<HTMLDivElement> {
    const { location } = this.props;

    const routes: RouteData[] = [
      { text: "About", path: "/about", component: About },
      { text: "Projects", path: "/projects", component: Portfolio },
      { text: "Contact", path: "/contact", component: Contact },
    ].map(route => ({
      ...route,
      active: location.pathname === route.path,
    }));

    const pages = routes.map((route, i) => (
      <RouterRoute key={i} path={route.path} component={route.component} />
    ));

    return (
      <Container className={Styles.App}>
        <Background lightCount={100} />
        <Header routes={routes} />
        <section className={Styles.Content}>
          <Switch>
            <RouterRoute exact={true} path="/" component={Home} />
            {pages}
            <Redirect from="*" to="/" />
          </Switch>
        </section>
      </Container>
    );
  }
}

// withRouter provides location and history props
export const App = withRouter(_App as any);

export default App;
