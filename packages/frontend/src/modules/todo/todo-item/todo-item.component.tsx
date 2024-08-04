import React, { ReactElement } from 'react';
import { ITodo } from '~/types/todo.type';
import { deleteButton, panelButton, todoDesc, todoItem, todoTitle, updateButton } from './todo-item.styled';



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
        <div className={todoItem}>
            <h2 className={todoTitle}>{todo.title}</h2>
            <p className={todoDesc}>{todo.description}</p>
            <ul className={panelButton}>
                <li><button className={updateButton}>update</button></li>
                <li><button className={deleteButton}>delete</button></li>
            </ul>
            <p className={todoDesc}>{todo.isCompleted ? "Yes" : "No"}</p>
        </div>
    )
};
