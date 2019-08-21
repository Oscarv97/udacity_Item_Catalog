import * as React from "react";
import { IIventoryItem } from '~services/IInventoryItem';
import { IContentProps } from './IContentProps';
import { IContentState } from './IContentState';
import { Link } from "react-router-dom";

export default class Content extends React.Component<IContentProps, IContentState> {
    private editForm: any;

    constructor(props: IContentProps) {
        super(props)
        this.state = {
            items: this.props.menuItems,
            canSelect: true,
            selection: null,
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

    public render(): React.ReactElement<IContentProps> {
        let columns: string[] = [
            "ID",
            "Name",
            "Category",
            "Description",
            "User",
        ];
        return (
            <div className="container">
                <div className={"actionsBar"}>
                    <button><Link to="createItem/">
                    Create new Item
                    
                    </Link>
                    </button>
                    <button disabled={!this.state.selection!} onClick={this.deleteItem}>Delete Item</button>
                </div>

                <table className="contentTable" >
                    <thead>

                        <tr>
                            {columns.map((current, index) => {
                                return (
                                    <th key={`column${index}`}>{current}</th>
                                )
                            })}

                        </tr>
                        {this.state.items.map((menuItem: IIventoryItem, index) => {
                            return (

                                <tr className={menuItem.isSelected ? "selected" : ""} onClick={this.handleSelect.bind(this, index)} key={`tableRow${index}`}>
                                    <th className={"idColumn"}>{menuItem.id}</th>
                                    <th>{menuItem.name}</th>
                                    <th>{menuItem.category}</th>
                                    <th>{menuItem.description}</th>
                                    <th>{menuItem.user}</th>
                                </tr>
                            );
                        })}
                        <tr className="sampleItem">
                            <th>Selected Item = {JSON.stringify(this.state.selection)}</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>

                {/* add conditial render for edit form and item */}
                <button disabled={this.state.selection === null} onClick={this.openEdit}>Edit Item</button>
                {this.state.isEdit ?
                    <form  action="javascript:void(0);" onSubmit={this.saveEdit}>
            
                    <input type="text" />
                        <input onChange={this.handleEditEntry.bind(this)} type="text" value={this.state.edtingItem.name || ""} />
                        <input onChange={this.handleEditEntry.bind(this)}  type="text" value={this.state.edtingItem.description || ""} />
                        <input onChange={this.handleEditEntry.bind(this)} type="text" value={this.state.edtingItem.image || ""} />
                        
                    </form> :
                    null
                }
            </div>
        )
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

    private handleUpdate(editItem): void {
        this.props.dataServiceProvider.updateItem(editItem);
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
        !this.state.isEdit && this.state.canSave ? 
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
        this.props.dataServiceProvider.deleteItem(this.state.selection.id)
            .then()
            .catch((error: Error) => {
                console.log('Failure while attempting to delete item', error);
            });
    }
}
