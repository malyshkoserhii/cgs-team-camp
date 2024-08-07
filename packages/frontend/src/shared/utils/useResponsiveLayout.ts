import { useMediaQuery } from 'react-responsive';
import { BREAKPOINTS } from '~shared/styles';
interface ResponsiveLayout {
	isDesktop: boolean;
	isTablet: boolean;
	isMobile: boolean;
}

const useResponsiveLayout = (): ResponsiveLayout => {
	const isDesktop = useMediaQuery({
		minWidth: `${parseInt(BREAKPOINTS.desktop, 10) + 1}px`,
	});
	const isTablet = useMediaQuery({
		minWidth: `${parseInt(BREAKPOINTS.tablet, 10) + 1}px`,
		maxWidth: `${BREAKPOINTS.desktop}`,
	});
	const isMobile = useMediaQuery({ maxWidth: `${BREAKPOINTS.tablet}` });

	return { isDesktop, isTablet, isMobile };
};
export default useResponsiveLayout;
