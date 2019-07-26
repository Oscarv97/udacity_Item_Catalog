import * as React from "react";
import { IHeaderProps } from "./IHeaderProps";


export class PageHeader extends React.Component<IHeaderProps, {}> {

   public componentWillReceiveProps() {

    }


    public render(): React.ReactElement<IHeaderProps> {
        return (
            <div className="header ms-Grid-row">
                <div className="ms-Grid-col ms-md2">
                    <p className="headerText">{this.props.strings.headerTitle}</p>
                </div>
                <div className="ms-Grid-col ms-md8"></div>
                <div className="userProfileCorner ms-Grid-col ms-md2">
                    <div className="ms-Grid-row" style={{height: "100%"}}>
                        <div className="ms-Grid-col ms-md6 userProfileCorner" style={{height: "100%"}}>
                            <button
                                onClick={this.props.onClickHandler.bind(this)}
                                className="loginButton">{this.props.isUserLoggedin ?
                                    this.props.strings.loginButton :
                                    this.props.strings.logoutButton
                                    }</button>
                        </div>
                        <div className="userProfileConatiner ms-Grid-col ms-md6" style={{height: "100%"}}>
                            <span aria-hidden={true} className="userProfileImage ms-Icon ms-Icon--ReminderPerson" style={{backgroundImage: `url:('')`}}>
                                <span className='ms-Icon ms-Icon--ReminderPerson' style={{visibility: "hidden", height:'100%'}}>hi</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        ); 
    }
}