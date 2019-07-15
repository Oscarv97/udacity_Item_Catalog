import * as React from "react";

export default class App extends React.Component<{}, {}> {


    public render(): React.ReactElement<any> {
        return (
            <div className="pageContainer">
                <header className="header">
                    <p className="headerText">Catalog App</p>
                </header>
                <div className="pageContent">
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                </div>
            </div>
        );
    }
}