import * as React from "react";
import { INewItemFormProps } from "./INewItemFormProps";
import { IInventoryItem } from "~services/IInventoryItem";
import { INewItemFormState } from "./INewItemFormState";

export default class newItemForm extends React.Component<INewItemFormProps, INewItemFormState> {

    private newItem: IInventoryItem;
    constructor(props: INewItemFormProps) {
        super(props);
        let authUser = sessionStorage.getItem('AuthUser');
        this.newItem = { category: "", id: 1, category_id: 1, name: "", user: "", description: "", user_id: 1 };
        this.state = {
            category: "",
            description: "",
            name: "",
            user: JSON.parse(authUser) || undefined,
            userId: 0
        }
        this.handleReset = this.handleReset.bind(this);
        this.trySubmit = this.trySubmit.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
    }

    private textFieldHandler(e: React.FormEvent<HTMLInputElement>): void {
        var eName = e.currentTarget.name;
        console.log(eName);
        var eValue = e.currentTarget.value;
        this.setState((prvState: any) => {
            prvState[eName] = eValue;
            return prvState;
        });
    }

    private handleReset(): void {
        this.setState((prevState: INewItemFormState) => {
            prevState.name = "";
            prevState.category = "";
            prevState.userId = 0;
            prevState.description = "";
            return prevState;
        });
    }


    private trySubmit(): any {
        if(!this.canSubmit){
            return;
        }
        let fields = this.state;
        // this.props.createItem(fields.name, fields.category, fields.description, fields.userId);gh
    }

    private canSubmit(): boolean {
        let fields = this.state;
        if (fields.userId != 0 && fields.name != "" && fields.category != "") {
            return true;
        }
        return false;
    }


    public render(): React.ReactElement<INewItemFormProps> {
        return (
            <div className="mainSection" data-automation={"editNavCategoryContainer"}>

            {this.state.user ?
                <div>
                <div>
                    <h1>Create new Item</h1>
                    <br />
                </div>
                <form>
                    <div className="form-group">
                        <label>Item Name</label>
                        <input name="name" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Item Name"></input>

                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input name="description" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="exampleInputPassword1" placeholder="Category Name"></input>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <input name="category" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="descriptionInput" placeholder="Item Description"></input>
                    </div>

                    {/* <div className="form-group">
                        <label>Description</label>
                        <input name="user" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="descriptionInput" placeholder="Item Description"></input>
                    </div> */}


                    {/* 
                    <div className="form-group form-check">
                    
                </div> */}
                    <button type="reset" onClick={this.handleReset} className="btn btn-secondary">Clear</button>
                    <button type="submit" onClick={this.trySubmit} className="btn btn-primary">Submit</button>
                </form>
                </div>
                :
                <div>
                    <h1>Please Log in to create Items</h1>
                    <br />
                </div>
                }

</div>
);
}

}