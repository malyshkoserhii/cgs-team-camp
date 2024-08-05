import { css } from '@emotion/css';
import { inputStyles } from '../textinput/textinput.styles';

export const textareaStyles = css`
	${inputStyles}
	min-height: 100px;
	resize: vertical;
`;
