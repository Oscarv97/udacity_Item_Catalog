import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as React from "react";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
import { HashRouter, Route, Switch, Link } from "react-router-dom";
import Footer from "./Components/footer/footer";
import { PageHeader } from "./Components/header/Header";
import Home from "./Components/Pages/Home";
import NoMatch from "./Components/Pages/NoMatch";
import { IAppState } from "./IAppState";
import SingleItem from "./Components/Pages/SingleItem";
import CategoryItems from "./Components/Pages/CategoryItems";


const authConfig = require("../clientSecrets.json");

export interface IStrings extends LocalizedStringsMethods {
    loginButton: string;
    logoutButton: string;
    headerTitle: string;
}


export default class App extends React.Component<{}, IAppState> {
    public strings: IStrings;


    private app: firebase.app.App;
    private oscarAuth: firebase.auth.Auth;
    private googleProvider;

    constructor(props: any) {
        super(props);

        this.state = {
            inventoryItems: [],
            selectedCategory: '',
            selectedItem: null,
            currentUser: undefined,
            isLoggedIn: false,
        }
        this.strings = new LocalizedStrings({
            en: {
                loginButton: "Login",
                logoutButton: "Logout",
                headerTitle: "Games Catalog"
            }
        });

        this.app = firebase.initializeApp(authConfig, "ItemCatalog");
        this.oscarAuth = this.app.auth();
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);


        this.oscarAuth.onAuthStateChanged(function (user) {
            if (user) {
                sessionStorage.setItem('AuthUser', JSON.stringify(user));
            } else {
                sessionStorage.removeItem('AuthUser');
            }
        });
    }

    private handleLogin(): void {
        this.oscarAuth.signInWithPopup(this.googleProvider).then((socialAuthUser: firebase.auth.UserCredential) => {
            this.setState((prevState: IAppState) => {
                prevState.currentUser = socialAuthUser.user;
                return prevState;
            });
        }).catch((error: Error) => {
            console.error('Failure to Sign in!', error);
        });
        // Force ReRender

        this.setState({});

    }

    private handleSignOut(): void {
        this.oscarAuth.signOut().then(() => {
            this.setState({ currentUser: undefined });
            sessionStorage.removeItem('AuthUser');
            window.location.reload();
        }).catch((error: Error) => {
            console.error('Error while attempting to sign out user', error);
        })
    }

    public componentDidMount(): void {
        window['oscar'] = this.oscarAuth;
        let sessionUser = sessionStorage.getItem('AuthUser');
        if (sessionUser) {
            this.setState({ currentUser: JSON.parse(sessionUser) });
        }
    }

    public render(): React.ReactElement<any> {
        return (

            <HashRouter>
                <div className="catalog-wrapper ms-Grid" dir="ltr">

                    <div className="header">
                        <PageHeader
                            signIn={this.handleLogin}
                            signOut={this.handleSignOut}
                            isUserLoggedIn={this.state.currentUser != null || undefined}
                            strings={this.strings}
                            user={this.state.currentUser || null}
                        >
                        </PageHeader>

                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link to="/home">
                                    <a className="nav-link active" href="#">All</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/items/Action/">
                                    <a className="nav-link active" href="#">Action</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/items/Adventure/">
                                    <a className="nav-link" href="#">Adventure</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/items/Racing/">
                                    <a className="nav-link" href="#">Racing</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link  to="/items/MMO/">
                                    <a className="nav-link" href="#">MMO</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/items/BattleRoyal/">
                                    <a className="nav-link" href="#">Battle Royal</a>
                                </Link>
                            </li>

                        </ul>
                    </div>

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route path="/item/:id/" component={SingleItem} />

                        {/* The below component does not detect url changes so doesn't know when to update when using another category link when it is already rendered */}
                        <Route path="/items/:category/" component={CategoryItems} />

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