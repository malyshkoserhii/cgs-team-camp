import { useFormik } from "formik"
import { ITodoCreate } from "~/types/todo.type"
import { TodoForm } from "./todo-form.component"
import React, { ReactElement } from "react"

const INITIAL_VALUES = {
    title: '',
    description: '',
    isCompleted: false,
    isPrivate: false,
}

const AddAndUpdateForm = ():ReactElement => {
    const formik = useFormik<ITodoCreate>({
        initialValues: INITIAL_VALUES,
        onSubmit: ()=>{}, //write submit query
        validate: (values:any) =>{
            return; //write validation func
        },
        validateOnChange:true
    })

    return (
        <TodoForm formik={formik} isUpdate={false} />
    )
}
export default AddAndUpdateForm;