import GridComponent from "./GridComponent";
import { IContentProps } from "./IContentProps";
import { IContentState } from "./IContentState";
const GreyBox = require("../images/GreyBox.svg");

import React = require("react");

export default class Grid extends React.Component<IContentProps, IContentState> {
    private editForm: any;
    constructor(props) {
        super(props);

        this.state = {
            currentUser: this.props.authedUser || undefined,
            items: this.props.menuItems || [],
            canSelect: true,
            selection: null,
            errMsg: "",
            isEdit: false,
            edtingItem: null,
            canSave: false,
        }

        this.deleteItem = this.deleteItem.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.newItemForm = this.newItemForm.bind(this);
        this.editForm = React.createRef();
        this.unSelect = this.unSelect.bind(this);
    }

    public componentWillReceiveProps(nextProps: IContentProps): void {
        this.setState({ currentUser: nextProps.authedUser, items: nextProps.menuItems });
    }

    private unSelect(): void {
        this.setState({ selection: null });
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
                                <button className="btn btn-primary" disabled={this.state.currentUser ? false : true} onClick={this.newItemForm}>Create new Item </button>
                                <button className="btn btn-primary" disabled={!this.state.selection!} onClick={this.deleteItem}>Delete Item</button>
                                <button className="btn btn-primary" disabled={this.state.selection === null} onClick={this.openEdit}>Edit Item</button>
                                <button className="btn btn-primary" disabled={this.state.selection === null || undefined} onClick={this.unSelect}>Clear Selection</button>
                            </div>
                            :
                            null
                        // If there is no user in the Session do not render the Actions bar
                    }

                    <div className="row justify-content-around text-center pb-5">
                        {this.state.items.map((currentItem, index) => {
                            return (<GridComponent
                                key={currentItem.id}
                                category={currentItem.category}
                                id={currentItem.id}
                                header={currentItem.name}
                                description={currentItem.description}
                                image={currentItem.image || GreyBox}
                                index={index}
                                selection={this.handleSelect}
                                isSelected={currentItem.isSelected}
                            />
                            )
                        }
                        )}
                    </div>
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


    private openEdit(): void {
        this.props.manageForm(this.state.selection);
    }

    private newItemForm(): void {
        this.props.manageForm();
    }



    private async deleteItem(): Promise<void> {
        let handleError = (error?) => {
            console.log('Failure while attempting to delete item');
        }
        try {
            let user = sessionStorage.getItem("AuthUser");
            let token = JSON.parse(user).stsTokenManager.accessToken;
            let userId = JSON.parse(user).uid;
            console.log('uuid == ' + userId );
            const response = await this.props.dataServiceProvider.deleteItem(this.state.selection.id, token, userId);
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
