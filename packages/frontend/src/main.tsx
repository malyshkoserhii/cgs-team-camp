import { PortalProvider } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './router/router';
import './shared/styles/global-styles.css';
ReactDOM.createRoot(document.getElementById('root')!).render(
	<PortalProvider portalClassName="my-custom-class">
		<Router />
		<ToastContainer />
	</PortalProvider>,
);
