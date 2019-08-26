import * as React from "react";
import GridComponent from "~/Components/Content/GridComponent";
import { DataBaseFactory } from "~services/DataBaseFactory";
import { IDataBaseService } from "~services/IDataBaseService";
import { ICategoryItemsState } from "./ICategoryItemsState";
const GreyBox = require("../images/GreyBox.svg");

export default class CategoryItems extends React.Component<{}, ICategoryItemsState> {
    private dataBaseService: IDataBaseService;
    /**
     *
     */
    constructor(props: any) {
        super(props);
        this.dataBaseService = DataBaseFactory.CreateDataBaseConnection('python');
        this.state = {
            categoryItems: undefined,
            categoryName: "All"
        }
    }


    componentDidMount(): void {
        let id = (this.props as any).match.params.id;
        console.log(JSON.stringify(this.props))
        let category = (this.props as any).match.params.category;
        this.dataBaseService.getCategoryItems(category).then((response) => {
            console.log(JSON.stringify(response, null, 2));
            this.setState({ categoryItems: response.allGames, categoryName: category });
        }).catch((error: Error) => {

        })

    }

    public render(): JSX.Element {
        let items = this.state.categoryItems ? this.state.categoryItems : [];
        let hasItems = items.length > 0;
        return (
            <div className="container">
                <div className="row justify-content-center py-5">
                <h1>{this.state.categoryName}</h1>
                    {hasItems ?
                        items.map((currentItem, index) => {
                            return (
                                <GridComponent
                                    key={index}
                                    category={currentItem.category}
                                    id={currentItem.id}
                                    header={currentItem.name}
                                    description={currentItem.description}
                                    image={currentItem.image || GreyBox}
                                    index={index}
                                    selection={null}
                                    isSelected={false}
                                />
                            );
                        })
                        :
                        null
                    }
                </div>
            </div>
        );
    }


}