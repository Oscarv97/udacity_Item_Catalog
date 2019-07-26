import * as React from "react";
import { PageHeader } from "~Components/header/Header";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import { IDataBaseService } from "~services/IDataBaseService";
import { DataBaseFactory } from "~services/DataBaseFactory";
import { IAppState } from "~IAppState";
import { IIventoryItem } from "~services/IInventoryItem";

export interface IStrings extends LocalizedStringsMethods {
    loginButton: string;
    logoutButton: string;
    headerTitle: string;
}


export default class App extends React.Component<{}, IAppState> {

    public strings: IStrings;
    private dataBaseService: IDataBaseService;

    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.state = {
            inventoryItems: [],
            selectedCategory: '',
            selectedItem: null,
            currentUser: null,
            isLoggedIn: this.state.currentUser ? true : false,
        }

        this.strings = new LocalizedStrings({
            en: {
                loginButton: "Login",
                logoutButton: "Logout",
                headerTitle: "Games Catalog'"
            }
        });
        this.handleSignIn = this.handleSignIn.bind(this);
        this.dataBaseService = DataBaseFactory.CreateDataBaseConnection('python');
    }

    public componentDidMount(): void {
        this.dataBaseService.getAll().then((items: IIventoryItem[]) => {
            this.setState((prevState: IAppState) => {
                prevState.inventoryItems = items;
                prevState.selectedCategory = 'all';
                return prevState;
            })
        })
            .catch((error: Error) => {
                console.error(error);
            })
    }

    private handleSignIn(provider: string): void {
        switch (provider) {
            case 'google':

                break;

            case 'faceBook':

                break;

            case 'standard':

                break;

            default:
                break;
        }
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