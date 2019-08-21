import * as React from "react";
import { INewItemFormProps } from "./INewItemFormProps";
import { IInventoryItem } from "~services/IInventoryItem";

export default class newItemForm extends React.Component<any, INewItemFormProps> {

    private newItem: IInventoryItem;
    constructor(props: INewItemFormProps) {
        super(props);
        this.newItem = {category: "", id:1, category_id: 1, name:"", user: "", description: "", user_id:1};

    }


    /**
     * Manipulate the props of the data object ref to this component
     *
     * @private
     * @param {*} event
     * @memberof NavCategory
     */
    private handleChange(event: any): void {
        // Assign to a variable because once the callback is invoked, the event values are cleared.
        let fieldName = event.target.name;
        let fieldValue = event.target.value;
        this.newItem[fieldName] = fieldValue;
        this.setState({});
    }


    public render(): React.ReactElement<INewItemFormProps> {
        return (
            <div className="mainSection" data-automation={"editNavCategoryContainer"}>
                <form action="">

                    <div className="categoryTitleContainer" tabIndex={-1}>
                        <input className="pru-myPlaces-urlBox" type="text" onChange={this.handleChange.bind(this)}
                            name="title" value={this.newItem.name} placeholder="Enter category title" />

                        <input type="text" className="pru-myPlaces-urlName" onChange={this.handleChange.bind(this)}
                            name="description" value={this.newItem.category} placeholder="Enter category description" />
                    </div>

                </form>

            </div>
        );
    }

}