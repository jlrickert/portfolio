import * as React from "react";
import Radium from "radium";

/* import "./nav.css";*/
import { ERoute } from "../app";

export interface INavProps {
  updateRoute: (route: ERoute) => void;
}

const fadein = Radium.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const divHeight = "50";

export const styles = {
  base: {
    zIndex: 9998,
    position: "fixed",
    height: "50px",
    width: "100%",
    margin: "0 auto",
    flexWrap: "wrap",
    maxWidth: "100%",
    top: 0,
  } as React.CSSProperties,
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as React.CSSProperties,
  item: {
    zIndex: 9999,
    fontSize: "200%",
    minWidth: "150px",
    textAlign: "center",
    paddingTop: "20px",
    width: "20%",
    height: "100%",
    color: "green",
    animationDuration: "2s",
    animationName: fadein,
    animationIterationCount: 1,
  } as React.CSSProperties,
};

@Radium
export class Nav extends React.Component<INavProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    const elems = [
      { routeName: "Home", route: ERoute.Home },
      { routeName: "About", route: ERoute.About },
      { routeName: "Projects", route: ERoute.Projects },
      { routeName: "Contact", route: ERoute.Contact },
    ].map(({ routeName, route }) => (
      <div
        key={routeName}
        style={styles.item}
        onClick={this.changeRoute(route)}
      >
        {routeName}
      </div>
    ));

    return (
      <div className="Nav" style={styles.base}>
        <nav style={styles.container}>{elems}</nav>
      </div>
    );
  }

  private changeRoute = (route: ERoute) => () => {
    this.props.updateRoute(route);
  };
}
