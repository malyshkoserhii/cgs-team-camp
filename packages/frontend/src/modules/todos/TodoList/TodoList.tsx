import React, { ChangeEvent, useEffect, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';

import { Todo } from '~typings/todo.types';
import { TodoItem } from '~modules/todos/TodoItem/TodoItem';
import {
	wrapper,
	buttonGroupStyle,
	searchInputStyle,
	container,
} from '~modules/todos/TodoList/TodoList.styles';
import { swiperContainerStyle } from '~modules/todos/TodoItem/TodoItem.styles';
import { ROUTER_KEYS } from '~shared/keys';
import { Button, StyledNavLink } from '~shared/components';
// import Button from '~shared/components';
import { useDeviceType } from '~shared/hooks';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => {
	const [searchFilter, setSearchFilter] = useState('');
	const [filter, setFilter] = useState<
		'All' | 'Completed' | 'Private' | 'Public'
	>('All');

	const { isMobile, isTablet } = useDeviceType();

	const filteredTodos = todos.filter((todo) => {
		if (filter === 'Completed' && !todo.isCompleted) return false;
		if (filter === 'Private' && !todo.isPrivate) return false;
		if (filter === 'Public' && todo.isPrivate) return false;
		if (
			searchFilter &&
			!todo.title.toLowerCase().includes(searchFilter.toLowerCase())
		)
			return false;
		return true;
	});

	console.log('filteredTodos: ', filteredTodos);

	useEffect(() => {
		if (searchFilter && filteredTodos.length === 0) {
			toast.warning('No todos match this filter');
		}
	}, [searchFilter, filteredTodos]);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchFilter(e.target.value);
	};

	const handleFilterChange = (
		newFilter: 'All' | 'Completed' | 'Private' | 'Public',
	): void => {
		const filteredArray = todos.filter((todo) => {
			if (newFilter === 'Completed' && !todo.isCompleted) return false;
			if (newFilter === 'Private' && !todo.isPrivate) return false;
			if (newFilter === 'Public' && todo.isPrivate) return false;
			return true;
		});

		if (filteredArray.length === 0) {
			toast.warning('No todos match this filter');
		}

		setFilter(newFilter);
	};

	return (
		<div>
			<div className={container}>
				<div className={wrapper}>
					<input
						type="text"
						placeholder="Search todos..."
						value={searchFilter}
						onChange={handleSearchChange}
						className={searchInputStyle}
					/>
					<StyledNavLink to={ROUTER_KEYS.ADD_NEW}>
						Add new
					</StyledNavLink>
				</div>
				<div className={buttonGroupStyle}>
					<Button
						text={'All'}
						onClick={() => handleFilterChange('All')}
					/>
					<Button
						text={'Completed'}
						onClick={() => handleFilterChange('Completed')}
					/>
					<Button
						text={'Private'}
						onClick={() => handleFilterChange('Private')}
					/>
					<Button
						text={'Public'}
						onClick={() => handleFilterChange('Public')}
					/>
				</div>
			</div>

			{isMobile &&
				filteredTodos.map((item) => (
					<TodoItem key={item.id} todo={item} />
				))}

			{isTablet && (
				<Swiper
					className={swiperContainerStyle}
					spaceBetween={10}
					slidesPerView={'auto'}
					pagination={{ clickable: true }}
					navigation
					modules={[Navigation, Pagination]}
				>
					{filteredTodos.map((item) => (
						<SwiperSlide key={item.id}>
							<TodoItem todo={item} />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	);
};
