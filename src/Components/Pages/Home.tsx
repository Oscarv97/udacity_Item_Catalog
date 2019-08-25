import * as React from "react";

import { IInventoryItem } from "../../services/IInventoryItem";
import { IHomeProps } from "./IHomeProps";
import { DataBaseFactory } from "~services/DataBaseFactory";
import { IDataBaseService } from "~services/IDataBaseService";
import Grid from "../../Components/Content/Grid";
import { IHomeState } from "./IHomeState";
import NewItemForm from "../Content/newItemForm";


export default class Home extends React.Component<IHomeProps, IHomeState> {
    private dataBaseService: IDataBaseService;

    constructor(props: IHomeProps) {
        super(props);
        let authUser = sessionStorage.getItem('AuthUser');
        let cachedResults = sessionStorage.getItem('catalogItems');
        let fakeMenuItems: IInventoryItem[] = [
            { category: "Test", id: 1, name: "Test Item", category_id: 1, description: "Test Description ", user: "Oscar", user_id: "1" },
            // { category: "Test", id: 1, name: "Test Item2", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
            // { category: "Test2", id: 1, name: "Test Item3", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1, isSelected: true },
            // { category: "Test2", id: 1, name: "Test Item4", category_id: 1, description: "Test Description ", user: "Oscar", user_id: 1 },
        ]
        this.state = {
            dbResults: JSON.parse(cachedResults) as IInventoryItem[] || fakeMenuItems,
            authUser: JSON.parse(authUser) || undefined,
            formOpen: false,
            formItem: undefined
        }
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.dataBaseService = DataBaseFactory.CreateDataBaseConnection('python');
    }


    // Get all the Items from the Db and store them on the state to be mapped as components
    public componentDidMount(): void {
        this.dataBaseService.getAll().then((result) => {
            if (result) {
                this.setState((prevState: IHomeState) => {
                    prevState.dbResults = result["allGames"];
                    return prevState;
                })
            }
        }).catch((error: Error) => {
            console.error("Failed to get inventory items from DB.", error);
        });
    }

    private openForm(item? :IInventoryItem) :void {
        console.log("Called open");
        if(item) {
            console.log((item));
            this.setState({formOpen: true, formItem: item});
        }else {
            this.setState({formOpen: true, formItem: null});
        }
    }

    private closeForm(): void {
        this.setState({formOpen: false , formItem: null});
    }

    public render(): React.ReactElement<IHomeProps> {
        return (
            <div className="">
                
                    <Grid
                        authedUser={this.state.authUser}
                        dataServiceProvider={this.dataBaseService}
                        menuItems={this.state.dbResults}
                        manageForm={this.openForm}
                        />
                        {this.state.formOpen ?
                        <NewItemForm
                                authedUser={this.state.authUser}
                                dataServiceProvider={this.dataBaseService}
                                editItem={this.state.formItem || null}
                                closeForm={this.closeForm}
                        />
                        : null
                    }
            </div>
        );
    }
}
