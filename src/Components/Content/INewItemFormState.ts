export interface INewItemFormState {
    name: string;
    description: string;
    category: string;
    user: firebase.User;
    userId: string;
}