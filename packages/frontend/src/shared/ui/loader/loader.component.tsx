import '@blueprintjs/core/lib/css/blueprint.css';
import { Spinner } from '@blueprintjs/core';
import * as classNames from 'classnames';
import { fullHeightStyle, spinnerStyle } from './loader.styles';

type LoaderProps = {
	fullHeight?: boolean;
};

const Loader = ({ fullHeight }: LoaderProps): React.ReactElement => {
	const combinedClassNames = classNames({
		spinnerStyle,
		[fullHeightStyle]: fullHeight,
	});

	return <Spinner className={combinedClassNames} />;
};

export default Loader;
