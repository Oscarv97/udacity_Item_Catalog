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
                        <tr onClick={this.handleSelect.bind(this, menuItem)} key={`tableRow${index}`}>
                            <th>{menuItem.id}</th>
                            <th>{menuItem.name}</th>
                            <th>{menuItem.category}</th>
                            <th>{menuItem.description}</th>
                            <th>{menuItem.user}</th>
                        </tr>

                            );
                        })}
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        )
    }

    private handleSelect(selectedItem): void {
        this.setState({selection: selectedItem});
    }
}
