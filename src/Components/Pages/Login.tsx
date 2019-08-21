import * as React from "react";
import { Link } from "react-router-dom";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase = require("firebase");
import { ILoginState } from "./ILoginState";


export class LoginPage extends React.Component<any, ILoginState> {
 
    private  uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          // Avoid redirects after sign-in.
          signInSuccessWithAuthResult: () => false
        }
      };

    constructor(props: any) {
        super(props);
    }
    


    public render(): React.ReactElement<any> {
        if (!this.state.isSignedIn) {
            return (
              <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
              </div>
            );
          }
          return (
            <div>
              <h1>Games Catalog</h1>
              <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
              <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
            </div>
          );
        }
}