import * as React from "react";

import { IInventoryItem } from "../../services/IInventoryItem";
import { IHomeProps } from "./IHomeProps";
import { DataBaseFactory } from "~services/DataBaseFactory";
import { IDataBaseService } from "~services/IDataBaseService";
import Grid from "../../Components/Content/Grid";


export default class Home extends React.Component<IHomeProps, any> {
    private dataBaseService: IDataBaseService;

    constructor(props: IHomeProps) {
        super(props);
        this.dataBaseService = DataBaseFactory.CreateDataBaseConnection('python');
    }

    public render(): React.ReactElement<IHomeProps> {
        let fakeMenuItems: IInventoryItem[] = [
            { category: "Test", id: 1, name: "Test Item", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            // { category: "Test", id: 1, name: "Test Item2", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            // { category: "Test2", id: 1, name: "Test Item3", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1, isSelected: true },
            // { category: "Test2", id: 1, name: "Test Item4", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
        ]
        return (
            <div className="">
                    <Grid
                        dataServiceProvider={this.dataBaseService}
                        menuItems={fakeMenuItems}/>
            </div>
        );
    }
}
