import * as React from 'react';
import { css } from '@emotion/css';
import { ClipLoader } from 'react-spinners';

const loaderPropsStyle = css`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

interface LoaderProps {
	loading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ loading }) => {
	return (
		<div className={loaderPropsStyle}>
			<ClipLoader color="#000" loading={loading} size={50} />
		</div>
	);
};
