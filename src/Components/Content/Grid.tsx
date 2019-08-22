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
    this.state = {
        // gridTextAssets: 
        items: [{ description: "", category: "",category_id:0,name:"", user:"Oscar", user_id:0, id: 0 }],
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

  // Get the text sample data from the back end
  public componentDidMount(): void {
    this.props.dataServiceProvider.getAll().then((result) => {
        if(result){
            this.setState((prevState: IContentState) => {
                prevState.items = result;
                return prevState;
            })
        }
        console.log(result);
    }).catch((error: Error) => {
        console.error("Failed to get inventory items from DB.", error);
    });
  }

 
  public render(): React.ReactElement<IContentProps> {

    return (
      <main id="mainContent">
        <div className="container">
          <div className="row justify-content-center py-5">
            <h1>All Items </h1>

          </div>
            <div className={"actionsBar"}>
                    <button><Link to="createItem/"> Create new Item </Link></button>
                    <button disabled={!this.state.selection!} onClick={this.deleteItem}>Delete Item</button>
                    <button disabled={this.state.selection === null} onClick={this.openEdit}>Edit Item</button>
                </div>

          <div className="row justify-content-around text-center pb-5">
            {this.props.menuItems.map(textAssets => (
              <GridComponent
                key={textAssets.id}
                header={textAssets.name}
                description={textAssets.description}
                image={textAssets.image || GreyBox}
              />
            ))}
          </div>
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
