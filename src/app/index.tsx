import * as React from "react";

import "./styles.css";
import { Background } from "../background";
import { Nav } from "../nav";
import { Home } from "../home";
import { About } from "../about";

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
        <Background />
        <Nav updateRoute={this.updateRoute} />
        <div className="spacer" />
        <div className="App-spacer">
          <Content className="App-content" />
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
    console.debug(route);
    this.setState({ route });
  };
}

export default App;
