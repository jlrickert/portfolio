import * as React from "react";

import * as Styles from "./contact.module.css";

export interface Props {
  name: string;
  subject: string;
  email: string;
}

export interface State {
  name: string;
  subject: string;
  email: string;
  message: string;
  returning: boolean;
}

export class Contact extends React.Component<Props, State> {
  url: Readonly<string> = "https://formspree.io/jaredrickert52@gmail.com";
  state = {
    name: "",
    subject: "",
    email: "",
    message: "",
    returning: false,
  };

  constructor(props: Props) {
    super(props);
    const uPathName = window.location.pathname;
    if (/thank/.test(uPathName)) {
      console.debug("is returning");
      this.state.returning = true;
      this.state.name = this.getNameFromPathName(uPathName);
      console.debug(`name is ${this.state.name}`);
    }
  }

  private getNameFromPathName(path: string): string {
    const pathLength = path.length;
    let name = [];
    console.debug(pathLength, pathLength <= 0);
    for (let i = pathLength - 1; i >= 0; i -= 1) {
      const c = path[i];
      if (c === "/") {
        break;
      }
      name.push(c);
    }

    return name.reduceRight((prev, next) => prev + next);
  }

  public render(): React.ReactElement<HTMLDivElement> {
    const { name, subject, email, returning } = this.state;
    const returningMessage = (
      <h2>Thank you {this.state.name}. I will respons ASAP!</h2>
    );

    return (
      <div className={Styles.Contact}>
        <h1>Contact</h1>

        {(this.state.returning && returningMessage) || (
          <p>
            If you have any questions or would like to chat, please feel free to
            shoot me an email using the form conveniently placed below.
          </p>
        )}
        <form
          className={Styles.ContactForm}
          onSubmit={this.handleSubmit}
          action="https://formspree.io/jaredrickert52@gmail.com"
          method="POST"
        >
          <label>Name:</label>
          <input
            name="name"
            autoComplete="name"
            type="text"
            required
            value={this.state.name}
            onChange={this.handleInputChange}
          />

          <label>Email:</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleInputChange}
          />

          <label>Subject:</label>
          <input
            name="subject"
            type="text"
            placeholder="Subject"
            autoComplete="on"
            value={this.state.subject}
            onChange={this.handleInputChange}
          />

          <label>Message:</label>
          <textarea
            name="message"
            required
            rows={5}
            maxLength={500}
            autoComplete="on"
            value={this.state.message}
            onChange={this.handleInputChange}
          />

          {/* dummy for bots to click on */}
          <input
            type="text"
            name="_gotcha"
            autoComplete="off"
            style={{ display: "none" }}
            onChange={this.handleInputChange}
          />

          <input
            type="hidden"
            name="_next"
            value={`${window.location.href}/thank/${this.state.name}`}
          />

          <div />
          <div>
            <input type="submit" value="send" className={Styles.Submit} />
          </div>
        </form>
      </div>
    );
  }

  private handleSubmit = (event: React.FormEvent<any>) => {
    /* event.preventDefault();*/
    console.debug(event);
  };

  private handleInputChange = (event: React.ChangeEvent<any>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
}
