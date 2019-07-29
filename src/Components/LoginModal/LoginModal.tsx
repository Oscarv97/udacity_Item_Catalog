import * as React from  'react';
import { ILoginModalProps } from './ILoginModalProps';
import { ILoginModalState } from './ILoginModalState';

export default class LoginModal extends React.Component<ILoginModalProps, ILoginModalState> {

    /**
     *
     */
    constructor(props: ILoginModalProps) {
        super(props);

        this.state = {
            loggedIn: this.props.loggedIn || false
        }      
    }

    public componentWillReceiveProps(nextProps: ILoginModalProps): void {
        this.setState({loggedIn: nextProps.loggedIn});
    }

    public render(): React.ReactElement<ILoginModalProps> {
        return !this.state.loggedIn ?(
            <div className="loginModal">
                <ol>
                    <li className="" onClick={this.props.handleLogin.bind(this)}>google</li>
                    <li className="" onClick={this.props.handleLogin.bind(this)}>FaceBook</li>
                    <li className="" onClick={this.props.handleLogin.bind(this)}>Github</li>
                    <li className="" onClick={this.props.handleLogin.bind(this)}>Github</li>
                </ol>
            </div>
        ) :
        null
    }
}