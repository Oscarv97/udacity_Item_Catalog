import * as React from "react";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import { IDataBaseService } from "~services/IDataBaseService";
import { DataBaseFactory } from "~services/DataBaseFactory";
import { IAppState } from "~IAppState";
import { IIventoryItem } from "~services/IInventoryItem";
import { IUser } from "~services/IUser";
import Footer from "~Components/footer/footer";
import { HashRouter, Route } from "react-router-dom";
import * as firebase from "firebase/app";
import Home from "./Components/Pages/Home";
import { LoginPage } from "~Components/Pages/Login";

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

        const config = {
            apiKey: 
            'AIzaSyDbd5MOubzIhx29g78IhZp-hWQpFXKeo_s',
            authDomain: 'myproject-1234.firebaseapp.com',
            // ...
        };
        firebase.initializeApp(config);

       
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



    public render(): React.ReactElement<any> {

        return (
            <div className="catalog-wrapper ms-Grid" dir="ltr">
             

                <HashRouter>
                    <div>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/home" component={Home}/>
                    <Route path="/login" component={LoginPage}/>
                    </div>
                </HashRouter>

                <div className="footer">
                    <Footer />
                </div>
            </div>

        );
    }
}