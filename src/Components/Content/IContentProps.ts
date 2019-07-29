import { IIventoryItem } from "~services/IInventoryItem";
import { IDataBaseService } from "~services/IDataBaseService";

export interface IContentProps {
    menuItems: IIventoryItem[];
    dataServiceProvider: IDataBaseService;
}