import * as React from "react";
import { INewItemFormProps } from "./INewItemFormProps";
import { IInventoryItem } from "~services/IInventoryItem";
import { INewItemFormState } from "./INewItemFormState";

export default class NewItemForm extends React.Component<INewItemFormProps, INewItemFormState> {

    private newItem: IInventoryItem;
    constructor(props: INewItemFormProps) {
        super(props);
        let authUser = sessionStorage.getItem('AuthUser');
        this.newItem = { category: "", id: 1, category_id: 1, name: "", user: "", description: "", user_id: "0" };
        this.state = {
            category: this.props.editItem? this.props.editItem.category: "",
            description: this.props.editItem? this.props.editItem.description: "",
            name: this.props.editItem? this.props.editItem.name:"",
            user: JSON.parse(authUser) || undefined,
            userId: "",
            image: "",
            isEdit: this.props.editItem === null || undefined? false: true

        }
        this.handleReset = this.handleReset.bind(this);
        this.trySubmit = this.trySubmit.bind(this);
        this.closeForm = this.closeForm.bind(this);

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
            prevState.userId = "";
            prevState.description = "";
            return prevState;
        });
    }

    private trySubmit(): any {
        let isEdit = this.state.isEdit
        let fields = this.state;
        let userToken = "0651123185"; 
        // fields.user.getIdToken().then((token) => {
        //     userToken = token;
        // }).catch((error: Error) => {
        //     console.error("Failed to extract token");
        // });
        
        if(isEdit){
            let editItem: IInventoryItem = {
                id: this.props.editItem.id,
                name: fields.name,
                category: fields.category,
                user: fields.user.email,
                description: fields.description,
                user_id: userToken
            };
            
            this.props.dataServiceProvider.updateItem(editItem).then((response) => {
                if(response.ok){
                   window.location.reload();
                }
            });
        }else {

            let newItem: IInventoryItem = {
                name: fields.name,
                category: fields.category,
                user: fields.user.email,
                description: fields.description,
                id:  Math.floor(Math.random() * Math.floor(999999)),
                user_id: userToken
                
            };
            this.props.dataServiceProvider.createItem(newItem).then((response) => {
                if(response.ok){
                   window.location.reload();
                }
            });
        }
    }

    private closeForm(): void {
        this.props.closeForm()
    }


    public render(): React.ReactElement<INewItemFormProps> {
        return (
            <div className="mainSection" data-automation={"editNavCategoryContainer"}>

                {this.state.user ?
                    <div>
                        <div>
                            <h1>{this.state.isEdit ? "Edit Item" :"Create new Item"}</h1>
                            <br />
                        </div>
                        <form action={"javascript(void);"} onSubmit={(e)=>{e.preventDefault();}}>
                            <div className="form-group">
                                <label>Item Name</label>
                                <input value={this.state.name} name="name" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Item Name"></input>

                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input value={this.state.image} name="image" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="imageUrl" placeholder="https://"></input>
                            </div>

                            <div className="form-group">
                                <label>Category select</label>
                                <select value={this.state.category} name="category" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} className="form-control" id="categorySelect">
                                    <option>Action</option>
                                    <option>Adventure</option>
                                    <option>Racing</option>
                                    <option>MMO</option>
                                    <option>Battle royal</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input value={this.state.description} name="description" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="descriptionInput" placeholder="Item Description"></input>
                            </div>

                            <button  onClick={this.closeForm} className="btn btn-secondary">Cancel</button>
                            <button type="reset" onClick={this.handleReset} className="btn btn-secondary">Clear</button>
                            <button  onClick={this.trySubmit} className="btn btn-primary">Submit</button>
                        </form>
                        <br />
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