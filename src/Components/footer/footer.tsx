import * as React from "react";
// import { Link } from "office-ui-fabric-react";

export default class Footer extends React.Component<any, any> {

    public render(): React.ReactElement<any> {
        return (
            <div className="footer-container">
                {'© Games Catalog 2019. '}
                <a href="https://github.com/OscarV97">Get in touch!</a>
                {' -- Made by '}
              

                <a href="https://github.com/oscarv97">Oscar Vial {'<@OscarV97>'}</a>
            </div>
        );
    }

}