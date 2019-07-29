import * as React from "react";
import { IIventoryItem } from '~services/IInventoryItem';
import { IContentProps } from './IContentProps';
import { IContentState } from './IContentState';

export default class Content extends React.Component<IContentProps, IContentState> {

    constructor(props: IContentProps) {
        super(props)
        this.state = {
            items: this.props.menuItems,
            canSelect: true,
            selection: null
        }
    }
    //handle selction
    // store on state for crud

    private deleteItem(): void {
        console.log(JSON.stringify(this.state.selection));
        this.props.dataServiceProvider.deleteItem(this.state.selection.id)
        .then()
        .catch((error: Error) => {
            console.log('Failure while attempting to delete item', error);
        });
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
                        <button>Create new Item</button>
                        <button disabled={!this.state.selection!} onClick={this.deleteItem}>Delete Item</button>
                </div>

                <table className="contentTable" >
                    <thead>
                        
                        <tr>
                            {columns.map((current, index) => {
                                return(
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
}
