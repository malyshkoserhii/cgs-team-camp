import { css } from '@emotion/css';
import { VIEW } from '~shared/styles/breakepoints';

export const todoItem = css`
    outline: solid black;
	@media ${VIEW.desktop} {
		display: contents;
	}

	outline: solid black;
`;

export const todoTitle = css`
	font-size: 18px;
`;

export const todoDesc = css`
	@media ${VIEW.mobile} {
		font-size: 14px;
	}

	@media ${VIEW.desktop} {
		font-size: 18px;
	}
`;
export const panelButton = css`
	display: flex;
	gap: 5px;
`;

export const updateButton = css`
	background-color: #007bff;
	color: white;
	border: none;
	padding: 8px 16px;
	font-size: 16px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #0056b3;
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}
`;

export const deleteButton = css`
	background-color: #dc3545;
	color: white;
	border: none;
	padding: 8px 16px;
	font-size: 16px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #c82333;
	}

	&:focus {
		outline: none;
	}

	&:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}
`;
