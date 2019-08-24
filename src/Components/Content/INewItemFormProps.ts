import { IDataBaseService } from "~services/IDataBaseService";

export interface INewItemFormProps {
    dataServiceProvider: IDataBaseService;
    authedUser: firebase.User;
}