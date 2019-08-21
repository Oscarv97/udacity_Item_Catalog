import * as React from "react";
import { Link } from "react-router-dom";

export default class NoMatch extends React.Component<any, any> {
    
    public render(): React.ReactElement<any> {
        return(
            <div className="no-match-container">
                <h3>404, These are not the droids you are looking for!</h3>

                <button><Link to="/home">Return Home</Link></button>
            </div>
        )

    }
}