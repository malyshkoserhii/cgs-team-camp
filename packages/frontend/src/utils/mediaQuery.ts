export const mediaQuery = (breakpoint) => {
	return (style): string => `@media (max-width: ${breakpoint}) { ${style} }`;
};
