import { IStrings } from "~App";

export interface IHeaderProps {
    onClickHandler(signInService?: string): any;
    strings: IStrings;
    isUserLoggedin: boolean;
}