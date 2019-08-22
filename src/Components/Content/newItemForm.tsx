import * as React from "react";
import { INewItemFormProps } from "./INewItemFormProps";
import { IInventoryItem } from "~services/IInventoryItem";

export default class newItemForm extends React.Component<any, INewItemFormProps> {

    private newItem: IInventoryItem;
    constructor(props: INewItemFormProps) {
        super(props);
        this.newItem = { category: "", id: 1, category_id: 1, name: "", user: "", description: "", user_id: 1 };

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
                <form>
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>

                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1">

                        </input>
                        <label className="form-check-label" >Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
        );
    }

}