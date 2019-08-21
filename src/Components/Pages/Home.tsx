import * as React from "react";
import Content from "../Content/Content";

import { IIventoryItem } from "../../services/IInventoryItem";
import { IHomeProps } from "./IHomeProps";


export default class Home extends React.Component<IHomeProps, any> {

    constructor(props: IHomeProps) {
        super(props);

    }

    public render(): React.ReactElement<IHomeProps> {
        let fakeMenuItems: IIventoryItem[] = [
            { category: "Test", id: 1, name: "Test Item", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            { category: "Test", id: 1, name: "Test Item2", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            { category: "Test2", id: 1, name: "Test Item3", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1, isSelected: true },
            { category: "Test2", id: 1, name: "Test Item4", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
        ]
        return (
            <div className="home-wrapper">
                <div className="content Ms-Grid">
                    <Content
                        dataServiceProvider={this.props.dataBaseService}
                        // menuItems={this.props.inventoryItems}
                        menuItems={fakeMenuItems}
                    />
                </div>
            </div>
        );
    }
}
