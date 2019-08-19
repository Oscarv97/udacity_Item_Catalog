import * as React from "react";
import { Link } from "react-router-dom";


export class LoginPage extends React.Component<any, {}> {

   public componentWillReceiveProps() {

    }

    public render(): React.ReactElement<any> {
        return (
            <div className="header ms-Grid-row">
                <button>Home
                    <Link to='/home'/>
                </button>
               Login Page
            </div>

        ); 
    }
}