import * as React from "react";
import { Route, Switch, Redirect, withRouter, match } from "react-router-dom";
import { History, Location } from "history";

import { Background } from "../Background";
import { Nav } from "../Nav";
import { Home } from "../Home";
import { About } from "../About";
import { ProjectList } from "../ProjectList";
import { Contact } from "../Contact";
import { Resume } from "../Resume";
import "./styles.css";

export interface IAppProps {
  location: Location;
  history: History;
}

export interface IAppState {}

class _App extends React.Component<IAppProps, IAppState> {
  public state: IAppState = {};

  public render(): React.ReactElement<HTMLDivElement> {
    const { location } = this.props;

    const routes = [
      { text: "Fun side projects", path: "/projects", component: ProjectList },
      { text: "About", path: "/about", component: About },
      { text: "Contact", path: "/contact", component: Contact },
      { text: "Resume", path: "/resume", component: Resume },
    ].map(route => ({
      ...route,
      active: location.pathname === route.path,
    }));

    const elems = routes.map((route, i) => (
      <Route key={i} path={route.path} component={route.component} />
    ));

    return (
      <div className="App">
        {/* routes load slow if this is not on top */}
        <Background lightCount={100} />

        <Nav routes={routes} />
        <hr />
        <div className="App-content u-fadein-2 container">
          <Switch>
            <Route exact={true} path="/" component={Home} />
            {elems}
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export const App = withRouter(_App as any);

export default App;
