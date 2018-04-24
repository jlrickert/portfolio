import * as React from "react";
import Radium from "radium";

import { Background } from "../background";
import { Nav, styles as navStyles } from "../nav";
import { Home } from "../home";

export enum ERoute {
  Home = "#home",
  About = "#about",
  Contact = "#contact",
  Projects = "#projects",
}

export interface IAppState {
  route: ERoute;
}

export const styles = {
  base: { width: "100%", height: "100%" } as React.CSSProperties,
  spacer: { paddingTop: navStyles.base.height },
};

@Radium
export class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    route: ERoute.Home,
  };

  public render(): React.ReactElement<HTMLDivElement> {
    const Content = this.matchRoute(this.state.route);

    return (
      <div style={styles.base} className="App">
        <Background />
        <Nav updateRoute={this.updateRoute} />
        <div className="spacer" style={styles.spacer} />
        <Content className="App-content" />
      </div>
    );
  }

  private matchRoute(route: ERoute) {
    switch (route) {
      case ERoute.Home: {
        return Home;
      }
      case ERoute.About: {
        return Home;
      }
      case ERoute.Contact: {
        return Home;
      }
      case ERoute.Projects: {
        return Home;
      }
    }
  }

  private updateRoute = (route: ERoute) => {
    console.debug(route);
    this.setState({ route });
  };
}

export default App;
