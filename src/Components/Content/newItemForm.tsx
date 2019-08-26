import * as React from "react";
import { INewItemFormProps } from "./INewItemFormProps";
import { IInventoryItem } from "~services/IInventoryItem";
import { INewItemFormState } from "./INewItemFormState";

export default class NewItemForm extends React.Component<INewItemFormProps, INewItemFormState> {

    private newItem: IInventoryItem;
    private textInput: any;
    constructor(props: INewItemFormProps) {
        super(props);
        let authUser = sessionStorage.getItem('AuthUser');
        this.newItem = { category: "", id: 1, category_id: 1, name: "", user: "", description: "", user_id: "0" };
        this.state = {
            category: this.props.editItem ? this.props.editItem.category : "Action",
            description: this.props.editItem ? this.props.editItem.description : "",
            name: this.props.editItem ? this.props.editItem.name : "",
            user: JSON.parse(authUser) || undefined,
            userId: "",
            image: "",
            isEdit: this.props.editItem === null || undefined ? false : true

        }
        this.textInput = React.createRef();
        this.handleReset = this.handleReset.bind(this);
        this.trySubmit = this.trySubmit.bind(this);
        this.closeForm = this.closeForm.bind(this);

    }

    public componentDidMount(): void {
        this.textInput.current.focus();
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

    private async trySubmit(): Promise<void> {
        let isEdit = this.state.isEdit
        let fields = this.state;
        let handleError = (error?) => {
            console.log('Failure while attempting to delete item');
        }
        let user = sessionStorage.getItem("AuthUser");
        let token = JSON.parse(user).stsTokenManager.accessToken;

        if (isEdit) {
            try {
                let editItem: IInventoryItem = {
                    id: this.props.editItem.id,
                    name: fields.name,
                    category: fields.category,
                    user: fields.user.email,
                    description: fields.description,
                    user_id: token
                };
                const response = await this.props.dataServiceProvider.updateItem(editItem, token);
                if (response.ok) {
                    window.location.reload();
                } else {
                    handleError();
                }
            } catch (error) {
                handleError(error);
            }

        } else {
            try {
            let newItem: IInventoryItem = {
                name: fields.name,
                category: fields.category,
                user: fields.user.email,
                description: fields.description,
                id: Math.floor(Math.random() * Math.floor(999999)),
                user_id: token

            };
            const response = await this.props.dataServiceProvider.createItem(newItem, token);
                if (response.ok) {
                    window.location.reload();
                } else {
                    handleError();
                }
            } catch (error) {
                handleError(error);
            }
        }
    }

    private closeForm(): void {
        this.props.closeForm()
    }


    public render(): React.ReactElement<INewItemFormProps> {
        return (
            <div className="mainSection" data-automation={"editNavCategoryContainer"}>
                {
                    this.state.user ?
                        <div>
                            <div>
                                <h1>{this.state.isEdit ? "Edit Item" : "Create new Item"}</h1>
                                <br />
                            </div>
                            <form action={"javascript(void);"} onSubmit={(e) => { e.preventDefault(); }}>
                                <div className="form-group">
                                    <label>Item Name</label>
                                    <input ref={this.textInput} value={this.state.name} name="name" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Item Name" required={true}></input>

                                </div>
                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input value={this.state.image} name="image" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="imageUrl" placeholder="https://" required={true}></input>
                                </div>

                                <div className="form-group">
                                    <label>Category select</label>
                                    <select value={this.state.category} name="category" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} className="form-control" id="categorySelect" required={true}>
                                        <option>Action</option>
                                        <option>Adventure</option>
                                        <option>Racing</option>
                                        <option>MMO</option>
                                        <option>BattleRoyal</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <input value={this.state.description} name="description" onChange={((e) => { this.textFieldHandler(e); }).bind(this)} type="text" className="form-control" id="descriptionInput" placeholder="Item Description" required={true}></input>
                                </div>

                                <button onClick={this.closeForm} className="btn btn-secondary">Cancel</button>
                                <button type="reset" onClick={this.handleReset} className="btn btn-secondary">Clear</button>
                                <button onClick={this.trySubmit} className="btn btn-primary">Submit</button>
                            </form>
                            <br />
                        </div>
                        :
                        <div>
                            <h1>Please Log in to create Items</h1>
                            <br />
                        </div>
                }

            </div >
        );
    }

}