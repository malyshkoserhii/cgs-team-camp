import React, { FunctionComponent, ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { VIEW } from '~shared/styles/breakepoints';
import { Swiper } from '../swipper/swiper.component';



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
        query: VIEW.tablet,
    });
    return (
        isTablet ? (
            <Swiper/>
        ) :
        (
            <ul>
                {
                    items.map(item=>(
                        <Component key={item.id} {...item}/>
                    ))
                }
            </ul>
        )
    )
};
