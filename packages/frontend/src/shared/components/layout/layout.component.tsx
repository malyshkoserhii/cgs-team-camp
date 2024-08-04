import React, { FunctionComponent, ReactElement } from 'react';
import { useMediaQuery } from 'react-responsive';
import { VIEW } from '~shared/styles/breakepoints';
import { SwiperTodo } from '../swipper/swiper.component';
import { mainLayout, tableHeader } from './layout.styled';
import { ITodo } from '~/types/todo.type';

type Props<T> = {
    items: T[];
    render: FunctionComponent<T>;
    className?: string;
};

export const Layout = <T extends ITodo>({
    items,
    render: Component,
    className,
    ...otherProps
}: Props<T>): ReactElement => {
    const isTablet = useMediaQuery({
        query: VIEW.tabletToDesktop,
    });

    const isDesktop = useMediaQuery({
        query: VIEW.desktop,
    });

    const isMobile = useMediaQuery({
        query: VIEW.mobileToTablet,
    });

    console.log("isMobile", isMobile);
    console.log("isTablet", isTablet);
    console.log("isDesktop", isDesktop);
    console.log(items);

    if (isTablet) {
        return <SwiperTodo todos={items} component={Component} />;
    }

    if (isDesktop) {
        return (
            <div className={mainLayout}>
                <div className={tableHeader}>Title</div>
                <div className={tableHeader}>Description</div>
                <div className={tableHeader}>Action</div>
                <div className={tableHeader}>Completed</div>
                {items.map((item) => (
                    <Component key={item.id} {...item} />
                ))}
            </div>
        );
    }

    if (isMobile) {
        return (
            <div className={mainLayout}>
                {items.map((item) => (
                    <Component key={item.id} {...item} />
                ))}
            </div>
        );
    }
};
