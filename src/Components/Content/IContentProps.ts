import { IInventoryItem } from "~services/IInventoryItem";
import { IDataBaseService } from "~services/IDataBaseService";

export interface IContentProps {
    menuItems: IInventoryItem[];
    dataServiceProvider: IDataBaseService;
}