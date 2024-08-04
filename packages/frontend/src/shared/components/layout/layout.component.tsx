import React, { FunctionComponent, ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { BREAKPOINTS, VIEW } from '~shared/styles/breakepoints';
import { Swiper } from '../swipper/swiper.component';
import { mainLayout } from './layout.styled';



type Props<T> = {
	items: T[];
	render: FunctionComponent<T>;
	className?: string;
};

export const Layout = <T extends { id: number }>({
    items,
    render:Component,
	className,
	...otherProps
}:Props<T>): ReactElement => {
    const isTablet = useMediaQuery({
        query: VIEW.tabletToDesktop,

    });

    if (isTablet){
        return <Swiper/>
    }
    
    console.log(isTablet)
    return (
       
        (
            <ul className={mainLayout}>
                {
                    items.map(item=>(
                        <Component key={item.id} {...item}/>
                    ))
                }
            </ul>
        )
    )
};
