import { IStrings } from "../../App";
import { IDataBaseService } from "~services/IDataBaseService";

export interface IHomeProps {
    strings: IStrings;
    
    dataBaseService: IDataBaseService;
}