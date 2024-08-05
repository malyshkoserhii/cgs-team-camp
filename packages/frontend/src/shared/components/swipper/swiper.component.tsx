import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ITodo } from '~/types/todo.type';

type Props<T> = {
    todos: T[];
    component: React.FunctionComponent<T>;
};

export const SwiperTodo = <T extends ITodo>({ todos, component: Component }: Props<T>) => {
    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
        >
            {todos.map(todo => (
                <SwiperSlide key={todo.id}>
                    <Component {...todo} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};