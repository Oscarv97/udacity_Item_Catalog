import { IDataBaseService } from "./IDataBaseService";
import { DataBaseService } from "./DataBaseService";

export class DataBaseFactory implements IDataBaseService {
    private databaseService: IDataBaseService;

    private constructor(datebaseService: IDataBaseService) {
        this.databaseService = datebaseService;
    }

    public static CreateDataBaseConnection(dbType: string): IDataBaseService {
        switch (dbType) {
            case 'python':
                return new DataBaseFactory(new DataBaseService());
            default:
                return new DataBaseFactory(new DataBaseService());
        }
    }

    public getAll(): Promise<any> {
        return this.databaseService.getAll();
    }

    public getItem(itemId: string, catagoryId: string): Promise<any> {
        return this.databaseService.getItem(itemId, catagoryId);
    }

    public deleteItem(itemId: string): Promise<any> {
        return this.databaseService.deleteItem(itemId);
    }

    public updateItem(item: any): Promise<any> {
        return this.databaseService.updateItem(item);
    }

    public createItem(item: any): Promise<any> {
        return this.databaseService.createItem(item);
    }
}