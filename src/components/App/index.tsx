import * as React from "react";
import { Route, Switch, Redirect, withRouter, match } from "react-router-dom";
import { History, Location } from "history";

import { Background } from "../Background";
import { Header } from "../Header";
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

export interface IAppState {
  isLoading: boolean;
}

class _App extends React.Component<IAppProps, IAppState> {
  public state: IAppState = {
    isLoading: true,
  };

  public render(): React.ReactElement<HTMLDivElement> {
    const { location } = this.props;

    const routes = [
      { text: "About", path: "/about", component: About },
      { text: "Projects", path: "/projects", component: ProjectList },
      { text: "Contact", path: "/contact", component: Contact },
      { text: "Resume", path: "/resume", component: Resume },
    ].map(route => ({
      ...route,
      active: location.pathname === route.path,
    }));

    const elems = routes.map((route, i) => (
      <Route key={i} path={route.path} component={route.component} />
    ));

    setTimeout(() => {
      const content = document.getElementById("mainContent")!;
      console.debug(content.classList.contains("u-fadein-2"));
      content.classList.remove("u-fadein-2");
      content.classList.add("u-fadein-2");
    }, 100);

    return (
      <div className="App">
        <Background lightCount={100} />
        <Header routes={routes} />
        <section id="mainContent" className="App-content u-fadein-2">
          <Switch>
            <Route exact={true} path="/" component={Home} />
            {elems}
            <Redirect from="*" to="/" />
          </Switch>
        </section>
      </div>
    );
  }
}

export const App = withRouter(_App as any);

export default App;
