import './shared/styles/global-styles.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app.module';
import { Providers } from './app/providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Providers>
		<App />
	</Providers>,
);
