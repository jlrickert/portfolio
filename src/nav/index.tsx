import * as React from "react";
import Radium from "radium";

/* import "./nav.css";*/
import { ERoute } from "../app";
import { CSSProperties } from "react";
import { EROFS } from "constants";

export interface INavProps {
  updateRoute: (route: ERoute) => void;
}

const fadein = Radium.keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const styles = {
  base: {
    zIndex: 9998,
    position: "fixed",
    height: "60px",
    width: "100%",
    margin: "0 auto",
    flexWrap: "wrap",
    maxWidth: "100%",
  } as CSSProperties,
  container: {
    top: 0,
    margin: "0 auto",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  } as CSSProperties,
  item: {
    zIndex: 9999,
    fontSize: "200%",
    minWidth: "150px",
    textAlign: "center",
    width: "20%",
    color: "green",
    animationDuration: "2s",
    animationName: fadein,
    animationIterationCount: 1,
  } as CSSProperties,
};

@Radium
export class Nav extends React.Component<INavProps, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    const elems = [
      { routeName: "Home", route: ERoute.Home },
      { routeName: "Projects", route: ERoute.Projects },
      { routeName: "About", route: ERoute.About },
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
      <Radium.StyleRoot>
        <nav style={styles.container}>{elems}</nav>
      </Radium.StyleRoot>
    );
  }

  private changeRoute = (route: ERoute) => () => {
    this.props.updateRoute(route);
  };
}
