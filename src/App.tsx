import * as React from "react";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import { IDataBaseService } from "./services/IDataBaseService";
import { DataBaseFactory } from "./services/DataBaseFactory";
import { IAppState } from "./IAppState";
import { IInventoryItem } from "./services/IInventoryItem";
import { IUser } from "./services/IUser";
import Footer from "./Components/footer/footer";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./Components/Pages/Home";
import { LoginPage } from "./Components/Pages/Login";
import { PageHeader } from "./Components/header/Header";
import NoMatch from "./Components/Pages/NoMatch";
import * as firebase from "firebase/app";
import newItemForm from "~Components/Content/newItemForm";

export interface IStrings extends LocalizedStringsMethods {
    loginButton: string;
    logoutButton: string;
    headerTitle: string;
}


export default class App extends React.Component<{}, IAppState> {
    public strings: IStrings;

    //shouldnt be here 
    private config = {
        apiKey: "AIzaSyDbd5MOubzIhx29g78IhZp-hWQpFXKeo_s",
    authDomain: "oscarudacityitemcatalog.firebaseapp.com",
    databaseURL: "https://oscarudacityitemcatalog.firebaseio.com",
    projectId: "oscarudacityitemcatalog",
    storageBucket: "oscarudacityitemcatalog.appspot.com",
    messagingSenderId: "871478275477",
    appId: "1:871478275477:web:2730c6ae1b5b6b5c"
    };

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

    
    }

    public componentDidMount(): void {

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

                    <Switch>

                        <Route exact path="/" component={Home} />

                        <Route exact path="/home" component={Home} />

                        <Route exact path="/login" component={LoginPage} />

                        <Route exact path="/createItem" component={newItemForm} />

                        <Route component={NoMatch} />
                    </Switch>
                  


                    <div className="footer">
                        <Footer />
                    </div>

                </div>
            </HashRouter>

        );
    }
}