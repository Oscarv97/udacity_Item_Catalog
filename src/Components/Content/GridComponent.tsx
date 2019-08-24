import * as  React from "react"
import { IGridCardProps } from "./IGridCardProps";

export default class GridComponent extends React.Component<IGridCardProps, {}> {

  /**
   *
   */
  constructor(props: IGridCardProps) {
    super(props);
  }

  public componentWillReceiveProps(): void {
      // Stateless Component has nothing to set but if the function invokes 
      // we can force a reRender to update the Readonly props for which card is selected
      this.setState({});
  }

  public render(): React.ReactElement<IGridCardProps> {

    let color = this.props.isSelected ? "blue" : "white";
    return (

      <div className="card" style={{ width: "18rem" }}>
        <img src={this.props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.header}</h5>
          <p style={{ backgroundColor: color }} className="card-text">{this.props.description}</p>
          <button onClick={this.props.selection.bind(this, this.props.index)} className="btn btn-primary">Select</button>
        </div>
      </div>

    );
  }
}
