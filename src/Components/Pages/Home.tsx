import React from "react";
import Content from "../Content/Content";
import SideBar from "../SideBar/SideBar";
import { IIventoryItem } from "~services/IInventoryItem";
import { PageHeader } from "~Components/header/Header";
import firebase = require("firebase");
import { IHomeProps } from "./IHomeProps";


export default class Home extends React.Component<IHomeProps, any> {
    /**
     *
     */
    constructor(props: IHomeProps) {
        super(props);
        
    }
  

    private handleSignIn(provider: string): void {
        const uiConfig = {
            // Popup signin flow rather than redirect flow.
            signInFlow: 'popup',
            // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
            signInSuccessUrl: '/signedIn',
            // We will display Google and Facebook as auth providers.
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ]
        };
    }
    public render(): React.ReactElement<IHomeProps> {
        let fakeMenuItems: IIventoryItem[] = [
            { category: "Test", id: 1, name: "Test Item", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            { category: "Test", id: 1, name: "Test Item2", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            { category: "Test2", id: 1, name: "Test Item3", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1, isSelected: true },
            { category: "Test2", id: 1, name: "Test Item4", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
        ]
        return (
            <div className="home-wrapper">
            <div className="header">
            <PageHeader isUserLoggedin={false} strings={this.props.strings} onClickHandler={this.handleSignIn}></PageHeader>
        </div>
                <div className="content Ms-Grid">

                    <Content
                        dataServiceProvider={this.props.dataBaseService}
                        // menuItems={this.state.inventoryItems}
                        menuItems={fakeMenuItems}
                    />
                </div>
                <div className="sidebar">
                    <SideBar links={[]} />
                </div>
            </div>
        );
    }
}
