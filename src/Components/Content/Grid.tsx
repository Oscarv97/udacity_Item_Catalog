import GridComponent from "./GridComponent";
const GreyBox = require("../images/GreyBox.svg");

import React = require("react");
import { IContentProps } from "./IContentProps";
import { Link } from "react-router-dom";
import { IContentState } from "./IContentState";

export default class Grid extends React.Component<IContentProps, IContentState> {
    private editForm: any;
    constructor(props) {
        super(props);
        let authUser = sessionStorage.getItem('AuthUser');
        this.state = {
            currentUser: this.props.authedUser || undefined,
            items: [{ description: "", category: "", category_id: 0, name: "", user: "Oscar", user_id: 0, id: 0 }],
            canSelect: true,
            selection: null,
            errMsg: "",
            isEdit: false,
            edtingItem: null,
            canSave: false,
        }

        this.deleteItem = this.deleteItem.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.submitEdit = this.submitEdit.bind(this);
        this.editForm = React.createRef();
    }

    public componentWillReceiveProps(nextProps: IContentProps): void {
        this.setState({currentUser: nextProps.authedUser});
    }


    public render(): React.ReactElement<IContentProps> {
        return (
            <main id="mainContent">
                <div className="container">
                    <div className="row justify-content-center py-5">
                        <h1>All Items </h1>

                    </div>

                    {
                        this.state.currentUser ?
                            <div className={"actionsBar"}>
                                <button><Link to="createItem/"> Create new Item </Link></button>
                                <button disabled={!this.state.selection!} onClick={this.deleteItem}>Delete Item</button>
                                <button disabled={this.state.selection === null} onClick={this.openEdit}>Edit Item</button>
                            </div>
                            :
                            null
                        // If there is no user in the Session do not render the Actions bar
                    }

                    <div className="row justify-content-around text-center pb-5">
                        {this.props.menuItems.map((currentItem, index) => (
                            <GridComponent
                                key={currentItem.id}
                                header={currentItem.name}
                                description={currentItem.description}
                                image={currentItem.image || GreyBox}
                                index={index}
                                selection={this.handleSelect}
                                isSelected={currentItem.isSelected}          
                                />
                        ))}
                    </div>

                    {this.state.isEdit ?
                        <form action="javascript:void(0);" onSubmit={this.saveEdit}>

                            <input type="text" />
                            <input onChange={this.handleEditEntry.bind(this)} type="text" value={this.state.edtingItem.name || ""} />
                            <input onChange={this.handleEditEntry.bind(this)} type="text" value={this.state.edtingItem.description || ""} />
                            <input onChange={this.handleEditEntry.bind(this)} type="text" value={this.state.edtingItem.image || ""} />

                        </form> :
                        null
                    }

                </div>

            </main>
        );
    }

    private handleSelect(selectedItem): void {
        this.setState((prevState: IContentState) => {
            prevState.items.forEach(element => {
                element.isSelected = false;
            });
            return prevState;
        }, () => {
            this.setState((prevState: IContentState) => {
                prevState.items[selectedItem].isSelected = true;
                prevState.selection = prevState.items[selectedItem];
                return prevState;
            });
        });
    }

    /**
     *  Check for Authenticated User else do nothing
     *  If the Action bar renders 
     * @private
     * @param {*} editItem
     * @memberof Grid
     */
    private handleUpdate(editItem): void {
        this.state.currentUser ?
            this.props.dataServiceProvider.updateItem(editItem) :
            null
    }

    private openEdit(): void {
        this.setState((prevState: IContentState) => {
            prevState.edtingItem = prevState.selection;
            prevState.isEdit = true;
            return prevState;
        })
    }

    private handleEditEntry(target: any): void {
        this.setState((prevState: any) => {

        });
    }

    /**
     * Need to save edit before submit
     *
     * @private
     * @memberof Content
     */
    private submitEdit(): void {
        !this.state.isEdit && this.state.canSave && this.state.currentUser ?
            this.props.dataServiceProvider.updateItem(this.state.edtingItem)
            :
            //do nothing
            //focus on edit form?
            null
    }

    private saveEdit(): void {
        this.setState((prevState: IContentState) => {
            prevState.canSave = true;
            prevState.isEdit = false;
            prevState.edtingItem = null;
            prevState.selection = null;
            return prevState
        })
    }

    private deleteItem(): void {
        console.log(JSON.stringify(this.state.selection));
        this.state.currentUser ?
            this.props.dataServiceProvider.deleteItem(this.state.selection.id)
                .then()
                .catch((error: Error) => {
                    console.log('Failure while attempting to delete item', error);
                })
            :
            this.setState({ errMsg: "Please Sign In" })
    }

}
