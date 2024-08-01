import * as React from 'react';
import Button from '~shared/components/button/button.component';

const App = (): React.ReactNode => {
	const [count, setCount] = React.useState(0);

	const onIncrease = (): void => {
		setCount((prev) => {
			return prev + 1;
		});
	};

	return (
		<>
			<h1>Todo project</h1>
			<p>{count}</p>
			<Button text="Increase" onClick={onIncrease} />
		</>
	);
};

export default App;
