import { IDataBaseService } from "~services/IDataBaseService";
import { IInventoryItem } from "~services/IInventoryItem";

export interface INewItemFormProps {
    authedUser: firebase.User;
    dataServiceProvider: IDataBaseService;
    closeForm: any;
    editItem? : IInventoryItem;
    
}