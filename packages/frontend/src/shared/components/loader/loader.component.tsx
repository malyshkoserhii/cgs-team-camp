import * as React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { colors } from '~shared/styles';
import { loaderContainer } from './loader.styles';
const Loader: React.FunctionComponent = () => {
	return (
		<ThreeDots
			color={colors.black}
			ariaLabel="three-dots-loading"
			wrapperClass={loaderContainer}
			visible={true}
		/>
	);
};
export default Loader;
