import * as React from "react";
import { PageHeader } from "~Components/header/Header";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";

export interface IStrings extends LocalizedStringsMethods {
    loginButton: string;
    logoutButton: string;
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
            en: {
                loginButton: "Login",
                logoutButton: "Logout",
                headerTitle: "Showroom"
            }
        });
    }


    private handleSignIn(): void {

    }


    public render(): React.ReactElement<any> {
        return (
       
            <div className="pageContainer ms-Grid" dir="ltr">
                <PageHeader isUserLoggedin={false} strings={this.strings} onClickHandler={this.handleSignIn}></PageHeader>
                <div className="pageContent">
                    
                </div>
            </div>
        );
    }
}