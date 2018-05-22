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

export class Project extends React.Component<Props, {}> {
  public render(): React.ReactElement<HTMLDivElement> {
    const {
      name,
      imageUrl,
      url,
      tech,
      shortDescription,
      description,
    } = this.props;

    return (
      <Container className={Styles.Project}>
        <h1 className={Styles.Name}>{name}</h1>
        <p className={Styles.ShortDescription}>{shortDescription}</p>
        {/* <p className={Styles.Description}>{description}</p> */}
        <div className={Styles.Tech}>
          {tech.map((t, i) => (
            <span key={i} className={Styles.TechItem}>
              {t}
            </span>
          ))}
        </div>
      </Container>
    );
  }
}

export default Project;
