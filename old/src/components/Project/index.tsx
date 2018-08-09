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

    const paragraphs: React.ReactElement<
      HTMLParagraphElement
    >[] = this.findParagraphs(description).map((p, i) => (
      <p key={i} className={Styles.Description}>
        {p}
      </p>
    ));

    return (
      <div
        className={`${Styles.Project} ${expanded ? Styles.Expanded : ""}`}
        onClick={this.handleClick}
      >
        <h1 className={Styles.Name}>{url ? nameWithUrl : name}</h1>
        <p className={Styles.ShortDescription}>{shortDescription}</p>
        {expanded && paragraphs}
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

  private findParagraphs = (text: string): string[] => {
    let paragraphs: string[] = [];
    let paraStart = 0;

    const textLength = text.length;
    for (let i = 0; i < textLength; i += 1) {
      if (!text[i + 1] || (text[i + 1] === "\n" && text[i + 2] === "\n")) {
        const paraEnd = i;

        let paragraph = text.slice(paraStart, paraEnd + 1);
        paragraphs.push(paragraph);

        // find the start of the next paragraph
        for (; text[i + 1] === "\n"; i += 1);
        paraStart = i;
      }
    }
    return paragraphs;
  };

  private handleClick = () => {
    if (this.state.expanded) {
      this.handleCloseClick();
    } else {
      this.handleOpenClick();
    }
  };

  private handleOpenClick = () => {
    this.setState({ expanded: true });
  };

  private handleCloseClick = () => {
    this.setState({ expanded: false });
  };
}

export default Project;
