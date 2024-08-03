import { css } from '@emotion/css';
import { VIEW } from '~shared/styles/breakepoints';

export const Form = css`
	width: 280px;
	padding: 5px;
	@media ${VIEW.mobile} {
		width: 300px;
		padding: 5px;
	}

	@media ${VIEW.tablet} {
		width: 600px;
		padding: 40px;
	}

	@media ${VIEW.desktop} {
		width: 800px;
		padding: 40px;
	}
	margin: 0 auto;
	align-items: center;
	gap: 20px;

	background-color: #eeeeee;
`;

export const TitleInput = css`
	font-size: 14px;
	font-weight: bold;
	color: black;
    margin-bottom: 5px;
`;

export const CheckInput = css`
	font-size: 14px;
	font-weight: bold;
	color: black;
`;

export const Input = css`
	width: 100%;
	padding: 10px 0;
	padding-left: 40px;
	border-radius: 5px;
	border: 0;
	font-size: 12px;
	@media ${VIEW.mobile} {
		font-size: 14px;
	}

	@media ${VIEW.tablet} {
		font-size: 16px;
		height: 48px;
	}

	@media ${VIEW.desktop} {
		font-size: 18px;
		height: 60px;
	}
	&:focus {
		outline: 1px solid #999999;
	}
`;
export const InputContainer = css`
	position: relative;
	margin-bottom: 25px;
`;

export const HorizontalConatiner = css`
    display: flex;
    gap: 4px;
`

export const Horizontal = css`
    display: flex;
    gap: 25px;
`

export const TextArea = css`
	width: 100%;

	padding: 10px 0;
	padding-left: 40px;
	border-radius: 5px;

	border: 0;
	font-size: 12px;
	font-family: 'Roboto', sans-serif;
	@media ${VIEW.mobile} {
		font-size: 14px;
	}

	@media ${VIEW.tablet} {
		font-size: 16px;
		height: 48px;
	}

	@media ${VIEW.desktop} {
		font-size: 18px;
		height: 60px;
		height: 200px;
	}
	&:focus {
		outline: 1px solid #999999;
	}
`;

export const SubmitButton = css`
	width: 60%;
	height: 40px;
	font-size: 20px;
	padding: 5px 0;
	font-family: 'Roboto', sans-serif;
	border: 0;
	border: 1px solid #999999;
	border-radius: 5px;
	font-weight: 700;
	display: flex;
	align-content: center;
	justify-content: center;
	margin: 0 auto;
	background-color: #e59999;
	color: #fff;
	transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	cursor: pointer;
	&:hover {
		background-color: #fff;
		color: #e59999;
	}
`;

export const TitleForm = css`
	text-align: center;
	font-size: 24px;
	font-weight: 700;
	font-family: 'Roboto', sans-serif;
	margin-bottom: 25px;
`;
