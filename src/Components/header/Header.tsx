import * as React from "react";
import { IHeaderProps } from "./IHeaderProps";


export class PageHeader extends React.Component<IHeaderProps, {}> {


    public render(): React.ReactElement<IHeaderProps> {
        return (
            <header className="header">
                <p className="headerText">{this.props.strings.headerTitle}</p>
                <button onClick={this.props.signInClick.bind(this, "google")}>{this.props.strings.loginButton}</button>
            </header>

        );
    }
}