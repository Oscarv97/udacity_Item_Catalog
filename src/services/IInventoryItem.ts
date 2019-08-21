export interface IInventoryItem {
    id: number;
    name: string;
    description: string;
    category_id: number;
    category: string;
    user_id: number;
    user: string;
    image?: string;
    isSelected?: boolean;
}