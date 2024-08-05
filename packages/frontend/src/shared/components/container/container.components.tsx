import React, { Children, ReactElement, ReactNode } from "react";
import { container } from "./container.styles";

interface ContainerProps {
    children: ReactNode;
}

export const Container = ({children}:ContainerProps): ReactElement =>{
    return (
        <div className={container}>
            {children}
        </div>
    )
}  