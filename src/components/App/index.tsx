import * as React from "react";
import { Route, Switch, Redirect, withRouter, match } from "react-router-dom";
import { History, Location } from "history";

import { Background } from "../Background";
import { Header } from "../Header";
import { Home } from "../Home";
import { About } from "../About";
import { ProjectList as Projects } from "../ProjectList";
import { Contact } from "../Contact";
import { Resume } from "../Resume";

import * as styles from "./styles.module.css";

export interface Route {
  text: string;
  path: string;
  component: React.Component;
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

    const routes = [
      { text: "About", path: "/about", component: About },
      { text: "Projects", path: "/projects", component: Projects },
      { text: "Contact", path: "/contact", component: Contact },
      { text: "Resume", path: "/resume", component: Resume },
    ].map(route => ({
      ...route,
      active: location.pathname === route.path,
    }));

    const pages = routes.map((route, i) => (
      <Route key={i} path={route.path} component={route.component} />
    ));

    return (
      <div className={styles.App}>
        <Background lightCount={100} />
        <Header routes={routes} />
        <section className={styles.Content}>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            {pages}
            <Redirect from="*" to="/" />
          </Switch>
        </section>
      </div>
    );
  }
}

export const App = withRouter(_App as any);

export default App;
