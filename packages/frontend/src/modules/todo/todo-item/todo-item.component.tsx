import React from 'react';



// id          Int @id @default(autoincrement())
// title       String @db.VarChar(255)
// description String
// isCompleted Boolean @default(false)
// isPrivate   Boolean @default(true)
// createdAt   DateTime @default(now())


export interface ITodo {
    id:number,
    title:string,
    description:string,
    isCompleted:boolean,
    isPrivate:boolean,
    createdAt:Date
}

export type TodoProps = {
    todo:ITodo,
}

export const TodoItem  :React.FC<TodoProps> = ({todo}) => {
    return(
        <div>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <ul>
                <li><button>update</button></li>
                <li><button>delete</button></li>
            </ul>
        </div>
    )
};
