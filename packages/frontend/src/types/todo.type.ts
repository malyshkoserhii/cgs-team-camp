export interface ITodo {
    id:number,
    title:string,
    description:string,
    isCompleted:boolean,
    isPrivate:boolean,
    createdAt:Date
}

export interface ITodoCreate {
    title:string,
    description:string,
    isCompleted?:boolean,
    isPrivate:boolean,
}