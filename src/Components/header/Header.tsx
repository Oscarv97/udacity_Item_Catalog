import * as React from "react";
import { IHeaderProps } from "./IHeaderProps";

export default class PageHeader extends React.Component<IHeaderProps, {}> {


    public render(): React.ReactElement<IHeaderProps> {
        return (
            <header className="header">
                <p className="headerText">Catalog App</p>
                <button onClick={this.props.signInClick.bind(this, "google")}>Sign in</button>
            </header>

        );
    }
}