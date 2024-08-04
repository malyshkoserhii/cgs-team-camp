import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { PortalProvider } from '@blueprintjs/core';
import { ThemeProvider } from '@emotion/react';

import ReactQueryProvider from './providers/react-query.provider';
import { THEME } from '~shared/styles/theme';
import App from '~modules/app/app.module';

import './shared/styles/global-styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ReactQueryProvider>
		<ThemeProvider theme={THEME}>
			<PortalProvider portalClassName="my-custom-class">
				<App />
			</PortalProvider>
		</ThemeProvider>
	</ReactQueryProvider>,
);
