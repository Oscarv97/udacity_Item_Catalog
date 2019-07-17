import * as React from "react";
import { PageHeader } from "~Components/header/Header";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";

export interface IStrings extends LocalizedStringsMethods {
    loginButton: string;
    headerTitle: string;
}


export default class App extends React.Component<{}, {}> {

    public strings: IStrings;

    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.strings = new LocalizedStrings({
            it: {
                loginButton: "Login",
                headerTitle: "Punti",
            },
            en: {
                loginButton: "Login",
                headerTitle: "Catalog App"
            }
        });
    }


    private handleSignIn(): void {

    }


    public render(): React.ReactElement<any> {
        return (
            <div className="pageContainer">
                <PageHeader strings={this.strings} signInClick={this.handleSignIn}></PageHeader>
                <div className="pageContent">
                    <ul>
                        <li>1</li>
                    </ul>
                </div>
            </div>
        );
    }
}