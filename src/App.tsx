import * as React from "react";
import { PageHeader } from "~Components/header/Header";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import { IDataBaseService } from "~services/IDataBaseService";
import { DataBaseFactory } from "~services/DataBaseFactory";
import { IAppState } from "~IAppState";
import { IIventoryItem } from "~services/IInventoryItem";
import { IUser } from "~services/IUser";
import Footer from "~Components/footer/footer";
import Content from "~Components/Content/Content";
import SideBar from "~Components/SideBar/SideBar";

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
        let fakeUser: IUser = {
            email: "oscarvial55@gmail.com",
            id: 1,
            name: "Oscar",

        }
        this.state = {
            inventoryItems: [],
            selectedCategory: '',
            selectedItem: null,
            currentUser: fakeUser,
            isLoggedIn: false,
        }

        this.strings = new LocalizedStrings({
            en: {
                loginButton: "Login",
                logoutButton: "Logout",
                headerTitle: "Games Catalog"
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
            });
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
        let fakeMenuItems: IIventoryItem[] = [
            {category: "Test", id: 1, name:"Test Item", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            {category: "Test", id: 1, name:"Test Item2", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            {category: "Test2", id: 1, name:"Test Item3", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            {category: "Test2", id: 1, name:"Test Item4", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
        ]
        return (
            <div className="pageContainer ms-Grid" dir="ltr">
                <div className="header">
                <PageHeader isUserLoggedin={false} strings={this.strings} onClickHandler={this.handleSignIn}></PageHeader>
                </div>

                <div className="body">
                    <div className="content Ms-Grid">

                        <Content
                            // menuItems={this.state.inventoryItems}
                            menuItems={fakeMenuItems}
                        />
                    </div>
                    <div className="sidebar">
                        <SideBar links={[]} />
                    </div>
                </div>

                <div className="footer">
                    <Footer />
                </div>
            </div>

        );
    }
}