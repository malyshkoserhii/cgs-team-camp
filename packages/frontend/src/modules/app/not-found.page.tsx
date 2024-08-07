import * as React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = (): React.ReactNode => {
	return (
		<div>
			<h3>Ooops, there is nothing here.</h3>
			<Link to={'/'}>Go to HomePage</Link>
		</div>
	);
};

export default NotFoundPage;
