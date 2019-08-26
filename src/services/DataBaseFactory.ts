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

    public getItem(itemId: number, categoryName: string): Promise<any> {
        return this.databaseService.getItem(itemId, categoryName);
    }

    public getCategoryItems(categoryName: string): Promise<any> {
        return this.databaseService.getCategoryItems(categoryName);
    }

    public deleteItem(itemId: number, token: string): Promise<void> {
        return this.databaseService.deleteItem(itemId, token);
    }

    public updateItem(item: any, token: string): Promise<void> {
        return this.databaseService.updateItem(item, token);
    }

    public createItem(item: any, token: string): Promise<void> {
        return this.databaseService.createItem(item, token);
    }
}