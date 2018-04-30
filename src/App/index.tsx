import * as React from "react";

import "./styles.css";
import { Background } from "../Background";
import { Nav } from "../Nav";
import { Home } from "../Home";
import { About } from "../About";

export enum ERoute {
  Home = "#home",
  About = "#about",
  Contact = "#contact",
  Projects = "#projects",
}

export interface IAppState {
  route: ERoute;
}
export class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    route: ERoute.Home,
  };

  public render(): React.ReactElement<HTMLDivElement> {
    const Content = this.matchRoute(this.state.route);

    return (
      <div className="App">
        <Nav updateRoute={this.updateRoute} />
        <Background lightCount={100} />
        <div className="App-spacer" />
        <div className="App-content">
          <div className="App-content-hud" />
          <Content />
        </div>
      </div>
    );
  }

  private matchRoute(route: ERoute) {
    switch (route) {
      case ERoute.Home: {
        return Home;
      }
      case ERoute.About: {
        return About;
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
    this.setState({ route });
  };
}

export default App;
