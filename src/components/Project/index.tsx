import * as React from "react";

import * as Styles from "./project.module.css";
import { Container } from "../Container";

export interface Props {
  name: string;
  imageUrl?: string;
  url?: string;
  tech: string[];
  category: string[];
  shortDescription: string;
  description: string;
}

interface State {
  expanded: boolean;
}

export class Project extends React.Component<Props, State> {
  state = {
    expanded: false,
  };

  public render(): React.ReactElement<HTMLDivElement> {
    const {
      name,
      imageUrl,
      url,
      tech,
      shortDescription,
      description,
    } = this.props;

    const { expanded } = this.state;

    const nameWithUrl = <a href={url}>{name}</a>;

    return (
      <div
        className={`${Styles.Project} ${expanded ? Styles.Expanded : ""}`}
        onClick={this.handleClick}
      >
        <h1 className={Styles.Name}>{url ? nameWithUrl : name}</h1>
        <p className={Styles.ShortDescription}>{shortDescription}</p>
        {expanded && <p className={Styles.Description}>{description}</p>}
        <div className={Styles.Tech}>
          {tech.map((t, i) => (
            <span key={i} className={Styles.TechItem}>
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  private handleClick = () => {
    if (this.state.expanded) {
      this.handleCloseClick();
    } else {
      this.handleOpenClick();
    }
  };

  private handleOpenClick = () => {
    console.debug("open");
    this.setState({ expanded: true });
  };

  private handleCloseClick = () => {
    console.debug("close");
    this.setState({ expanded: false });
  };
}

export default Project;
