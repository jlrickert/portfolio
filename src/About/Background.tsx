import * as React from "react";

export interface IBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export class Background extends React.Component<IBackgroundProps, {}> {
  public render(): React.ReactElement<any> {
    const { style, className, width, height } = this.props;
    return (
      <svg
        style={style}
        className={className}
        width={width || "100%"}
        height={height || "100%"}
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path
          stroke="green"
          strokeWidth="4px"
          fill="none"
          d="M 0 0 C 49 0 49 100 0 100"
        />
        <path
          stroke="green"
          strokeWidth="4px"
          fill="none"
          d="M 100 0 C 51 0 51 100 100 100"
        />
      </svg>
    );
  }
}
