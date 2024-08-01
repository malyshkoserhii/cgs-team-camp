import './shared/styles/global-styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { PortalProvider } from '@blueprintjs/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import Router from './router/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<PortalProvider portalClassName="my-custom-class">
		<Router />
	</PortalProvider>,
);
