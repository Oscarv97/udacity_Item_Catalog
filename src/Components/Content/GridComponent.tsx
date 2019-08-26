import * as  React from "react"
import { IGridCardProps } from "./IGridCardProps";
import { Link } from "react-router-dom";


export interface IGridState {
  isSelected: boolean;
}
export default class GridComponent extends React.Component<IGridCardProps, any> {

  /**
   *
   */
  constructor(props: IGridCardProps) {
    super(props);
    this.state = {
      isSelected: props.isSelected
    }
  }

  public componentWillReceiveProps(nextProps: IGridCardProps): void {
      this.setState({isSelected: nextProps.isSelected});
  }

  public render(): React.ReactElement<IGridCardProps> {

    let color = this.state.isSelected ? "#767676" : "white";
    return (

      <div className="card" style={{ width: "18rem" }}>
        <img src={this.props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{this.props.header}</h5>
          <p style={{ backgroundColor: color }} className="card-text">{this.props.description}</p>

      {this.props.selection ?
      <>

          <button onClick={this.props.selection.bind(this, this.props.index)} className="btn btn-primary">Select</button>
            <Link to={`/item/${this.props.id}`}>
            <button  className="btn btn-primary">
              Learn more
            </button>
            </Link>
      </>
        :
        null  
        }

        </div>
      </div>

    );
  }
}
