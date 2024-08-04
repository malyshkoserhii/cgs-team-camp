import React, { ReactElement } from 'react';
import { ITodo } from '~/types/todo.type';



// id          Int @id @default(autoincrement())
// title       String @db.VarChar(255)
// description String
// isCompleted Boolean @default(false)
// isPrivate   Boolean @default(true)
// createdAt   DateTime @default(now())




export type TodoProps = {
    todo:ITodo,
}

export const TodoItem = (todo:ITodo):ReactElement => {
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
