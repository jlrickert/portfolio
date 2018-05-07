import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IGotoTopButtonProps {
  className?: string;
}

const UpArrow = (props: {
  style?: React.CSSProperties;
  className?: string;
}) => {
  const width = 48;
  const height = 48;
  const x = 15;
  const leftCorner = `0,${height}`;
  const leftInnerCorner = `${x},${height}`;
  const top = `${width / 2},0`;
  const center = `${width / 2},${2 * x * Math.cos(Math.PI * 30 / 180)}`;
  const rightCorner = `${width},${height}`;
  const rightInnerCorner = `${width - x},${height}`;
  const path = `M ${leftCorner}
                L ${top}
                L ${rightCorner}
                L ${rightInnerCorner}
                L ${center}
                L ${leftInnerCorner}
                Z`;
  return (
    <svg
      style={props.style}
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
    >
      <path d={path} />
    </svg>
  );
};

export class GotoTopButton extends React.Component<IGotoTopButtonProps, {}> {
  private button: HTMLButtonElement;

  public componentDidMount() {
    this.button = ReactDOM.findDOMNode(this) as HTMLButtonElement;
    window.onscroll = this.handleScroll;
  }

  public render(): React.ReactElement<HTMLButtonElement> {
    const { className } = this.props;
    return (
      <button
        style={{ display: "none" }}
        className={className}
        onClick={this.gotoTop}
      >
        <UpArrow />
      </button>
    );
  }

  private gotoTop = (e: React.SyntheticEvent<any>) => {
    console.debug("clicked");
    e.preventDefault();
    document.documentElement.scrollTop = 0;
  };

  private handleScroll = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      this.button.style.display = "block";
    } else {
      this.button.style.display = "none";
    }
  };
}
