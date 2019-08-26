import * as React from "react";
import { IDataBaseService } from "~services/IDataBaseService";
import { DataBaseFactory } from "~services/DataBaseFactory";
import GridComponent from "~Components/Content/GridComponent";
import { ISingleItemState } from "./ISingleItemState";
const GreyBox = require("../images/GreyBox.svg");

export default class SingleItem extends React.Component<{}, ISingleItemState> {
    private dataBaseService: IDataBaseService;
    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.dataBaseService = DataBaseFactory.CreateDataBaseConnection('python');
        this.state = {
            item: undefined
        }
    }


    componentDidMount(): void {
        let id = (this.props as any).match.params.id;
        let category = (this.props as any).match.params.category;
        this.dataBaseService.getItem(id, category).then((response) => {
            console.log(JSON.stringify(response, null, 2));
            this.setState({item: response.item[0]});
        }).catch((error: Error) => {

        })
        console.log(JSON.stringify((this.props as any).match.params.id));
    }

    public render(): JSX.Element {
        let currentItem = this.state.item ? this.state.item : null;
        return (
            
            <div className="container">
                <div className="row justify-content-center py-5">
            {this.state.item ? 
            <GridComponent
                                key={currentItem.id}
                                category={currentItem.category}
                                id={currentItem.id}
                                header={currentItem.name}
                                description={currentItem.description}
                                image={currentItem.image || GreyBox}
                                index={1}
                                selection={null}
                                isSelected={false}
                                />
            :
            <div>{}</div>}
                                </div>
                                </div>
        );
    }
}