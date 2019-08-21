import * as React from "react";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import { IDataBaseService } from "./services/IDataBaseService";
import { DataBaseFactory } from "./services/DataBaseFactory";
import { IAppState } from "./IAppState";
import { IIventoryItem } from "./services/IInventoryItem";
import { IUser } from "./services/IUser";
import Footer from "./Components/footer/footer";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Pages/Home";
import { LoginPage } from "./Components/Pages/Login";
import { PageHeader } from "./Components/header/Header";
import NoMatch from "./Components/Pages/NoMatch";
import * as firebase from "firebase/app";

export interface IStrings extends LocalizedStringsMethods {
    loginButton: string;
    logoutButton: string;
    headerTitle: string;
}


export default class App extends React.Component<{}, IAppState> {
    public strings: IStrings;
    private dataBaseService: IDataBaseService;


    constructor(props: any) {
        super(props);

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
        firebase.initializeApp(this.config);

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
      
    }


    public render(): React.ReactElement<any> {
        return (

            <HashRouter>
                <div className="catalog-wrapper ms-Grid" dir="ltr">

                    <div className="header">
                        <PageHeader isUserLoggedIn={false} strings={this.strings}></PageHeader>
                    </div>

                    <Switch></Switch>
                        <Route exact path="/" component={Home} />

                        <Route path="/home" component={Home} />

                        <Route path="/login" component={LoginPage} />

                        <Route component={NoMatch} />
                  


                    <div className="footer">
                        <Footer />
                    </div>

                </div>
            </HashRouter>

        );
    }
}