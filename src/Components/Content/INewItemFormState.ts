export interface INewItemFormState {
    name: string;
    description: string;
    category: string;
    image: string;
    user: firebase.User;
    userId: string;
    isEdit: boolean;
}