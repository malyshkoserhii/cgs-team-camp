import classNames from 'classnames';
import { ReactElement } from 'react';
import { defaultImageStyle, roundedStyle, shadowStyle } from './image.styles';

type ImageProps = {
	src: string;
	alt?: string;
	width?: string;
	height?: string;
	borderRadius?: boolean;
	shadow?: boolean;
	extraStyles?: string;
};

const Image = ({
	src,
	alt,
	width,
	height,
	borderRadius = false,
	shadow = false,
	extraStyles,
}: ImageProps): ReactElement => {
	const styles = classNames(
		defaultImageStyle,
		{ [roundedStyle]: borderRadius },
		{ [shadowStyle]: shadow },
		extraStyles,
	);
	return (
		<img
			src={src}
			alt={alt}
			style={{
				width: width || 'auto',
				height: height || 'auto',
			}}
			className={styles}
		/>
	);
};

export default Image;
