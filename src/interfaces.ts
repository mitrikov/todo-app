export enum TodoStatuses {
    pending,
    completed
}

export interface ITodoItem {
    uuid: string
    order: number
    title: string
    description: string | null
    status: TodoStatuses
}

export interface ITodoFormData {
    title: string | null
    description: string | null
}