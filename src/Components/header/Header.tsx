import * as React from "react";
import { IHeaderProps } from "./IHeaderProps";
import { Link } from "react-router-dom";

export class PageHeader extends React.Component<IHeaderProps, {}> {

    constructor(props: IHeaderProps) {
        super(props);
    }

    public componentWillReceiveProps(nextProps: IHeaderProps) {
        this.setState({});
    }

    public render(): React.ReactElement<IHeaderProps> {
        return (
            <div className="header ms-Grid-row">
                <div className="ms-Grid-col ms-md2">
                    <p className="headerText">{this.props.strings.headerTitle}</p>
                </div>
                <div className="ms-Grid-col ms-md8"></div>
                <div className="userProfileCorner ms-Grid-col ms-md2">
                    <div className="ms-Grid-row">
                        <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
                            <Link className="nav-item nav-link active" to="/home">Home</Link>
                     
                            <button className="btn btn-primary my-2" >
                                <Link to='/login'>
                                    {
                                        this.props.isUserLoggedIn ?
                                            this.props.strings.loginButton :
                                            this.props.strings.logoutButton
                                    }
                                </Link>
                            </button>
                            <div className="av-item nav-link userProfileConatiner ms-Grid-col ms-md6" style={{ height: "100%" }}>
                                <span aria-hidden={true} className="userProfileImage ms-Icon ms-Icon--ReminderPerson" >
                                    <span className='ms-Icon ms-Icon--ReminderPerson' style={{ visibility: "hidden", height: '100%' }}>hi</span>
                                </span>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        );
    }
}