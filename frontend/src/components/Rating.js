import React from 'react';
import PropTypes from 'prop-types';

const Rating = ({ value, text, color }) => {
	return (
		// show full/half star icon depending on rating value
		<div className='rating'>
			{[1, 2, 3, 4, 5].map((ele, idx) => (
				<span key={idx}>
					<i
						style={{ color: color, fontSize: '0.9em' }}
						className={
							value >= ele
								? 'fas fa-star'
								: value >= ele - 0.5
								? 'fas fa-star-half-alt'
								: 'far fa-star'
						}
						title={`${value} Stars`}
					/>
				</span>
			))}
			<span style={{ fontSize: '0.9em' }}>{text && text}</span>
		</div>
	);
};

Rating.defaultProps = {
	color: '#f8e825',
};

Rating.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string,
	color: PropTypes.string,
};

export default Rating;
