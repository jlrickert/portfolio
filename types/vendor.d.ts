declare module "@fortawesome/react-fontawesome" {
  import { Component } from "react";

  export interface FontAwesomeIconProps {
    readonly border?: boolean;
    readonly className?: string;
    readonly mask?: object | any[] | string;
    readonly fixedWidth?: boolean;
    readonly flip?: "horizontal" | "vertical" | "both";
    readonly icon: object | any[] | string;
    readonly listItem?: boolean;
    readonly pull?: "right" | "left";
    readonly pulse?: boolean;
    readonly name?: string;
    readonly rotation?: 90 | 180 | 270;
    readonly size?:
      | "lg"
      | "xs"
      | "sm"
      | "1x"
      | "2x"
      | "3x"
      | "4x"
      | "5x"
      | "6x"
      | "7x"
      | "8x"
      | "9x"
      | "10x";
    readonly spin?: boolean;
    readonly symbol?: boolean;
    readonly transform?: string | object;
  }

  class FontAwesomeIcon extends Component<FontAwesomeIconProps> {}
  export default FontAwesomeIcon;
}
