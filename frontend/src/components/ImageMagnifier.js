import React, { useState } from 'react';
import { Image } from 'react-bootstrap';

const ImageMagnifier = ({
	src,
	alt,
	title,
	width,
	height,
	magnifierHeight = 200,
	magnifieWidth = 200,
	zoomLevel = 1.5,
}) => {
	const [[x, y], setXY] = useState([0, 0]);
	const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
	const [showMagnifier, setShowMagnifier] = useState(false);
	return (
		<div
			style={{
				position: 'relative',
				height: height,
				width: width,
			}}>
			<Image
				className='product-image'
				src={src}
				style={{ height: height, width: width }}
				fluid
				title={title}
				onMouseEnter={(e) => {
					// update image size and turn-on magnifier
					const elem = e.currentTarget;
					const { width, height } = elem.getBoundingClientRect();
					setSize([width, height]);
					setShowMagnifier(true);
				}}
				onMouseMove={(e) => {
					// update cursor position
					const elem = e.currentTarget;
					const { top, left } = elem.getBoundingClientRect();

					// calculate cursor position on the image
					const x = e.pageX - left - window.pageXOffset;
					const y = e.pageY - top - window.pageYOffset;
					setXY([x, y]);
				}}
				onMouseLeave={() => {
					// close magnifier
					setShowMagnifier(false);
				}}
				alt={alt}
			/>

			<div
				style={{
					display: showMagnifier ? '' : 'none',
					// display: window.innerWidth <= 468 ? 'none' : '',
					position: 'absolute',
					// prevent maginier blocks the mousemove event of img
					pointerEvents: 'none',
					height: `${magnifierHeight}px`,
					width: `${magnifieWidth}px`,
					// move element center to cursor pos
					top: `${y - magnifierHeight / 2.5}px`,
					left: `${x - magnifieWidth / 2.5}px`,
					opacity: '1', // reduce opacity so you can verify position
					border: '1px solid lightgray',
					backgroundColor: 'white',
					backgroundImage: `url('${src}')`,
					backgroundRepeat: 'no-repeat',
					borderRadius: '50%',

					//calculate zoomed image size
					backgroundSize: `${imgWidth * zoomLevel}px ${
						imgHeight * zoomLevel
					}px`,

					//calculete position of zoomed image.
					backgroundPositionX: `${
						-x * zoomLevel + magnifieWidth / 2
					}px`,
					backgroundPositionY: `${
						-y * zoomLevel + magnifierHeight / 2
					}px`,
				}}
			/>
		</div>
	);
};

export default ImageMagnifier;
