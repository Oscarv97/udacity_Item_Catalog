import * as React from "react";
import PageHeader from "~Components/Header";

export default class App extends React.Component<{}, {}> {


    public render(): React.ReactElement<any> {
        return (
            <div className="pageContainer">
                <PageHeader></PageHeader>
                <div className="pageContent">
                    <ul>
                        <li>1</li>
                    </ul>
                </div>
            </div>
        );
    }
}