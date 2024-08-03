import { useMediaQuery } from 'react-responsive';
import { DEVICE } from '~shared/keys';

interface DeviceType {
	isMobile: boolean;
	isTablet: boolean;
	isLaptop: boolean;
}

export const useDeviceType = (): DeviceType => {
	const isMobile = useMediaQuery({ query: DEVICE.untilTablet });
	const isTablet = useMediaQuery({ query: DEVICE.tablet });
	const isLaptop = useMediaQuery({ query: DEVICE.laptop });

	return { isMobile, isTablet, isLaptop };
};
