import { IStrings } from "~App";

export interface IHeaderProps {
    signInClick(signInService: string): any;
    strings: IStrings;
}