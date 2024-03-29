import { IStrings } from "../../App";

export interface IHeaderProps {
    strings: IStrings;
    isUserLoggedIn: boolean;
    signIn(): void;
    signOut(): void;
    user?: firebase.User;
   
}