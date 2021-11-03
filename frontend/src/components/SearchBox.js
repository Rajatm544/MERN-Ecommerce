import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	// search for the keyword by redirecting to homepage with param
	const handleSearch = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<Form onSubmit={handleSearch} className='d-flex'>
			{/* display searchbar inside navbar in large screens only */}
			<InputGroup className='mt-2'>
				<Form.Control
					type='text'
					style={{
						border: '1px solid #2c3e50',
						borderRight: 'none',
					}}
					name='keyword'
					className='mr-sm-2 ml-sm-4'
					onChange={(e) => setKeyword(e.target.value)}
					placeholder='Search Products...'
					value={keyword}
				/>
				<InputGroup.Text
					style={{
						background: 'white',
						border: '1px solid #2c3e50',
						borderLeft: 'none',
					}}>
					<button
						aria-label='search'
						style={{
							margin: '0',
							border: '0',
							outline: '0',
							background: 'transparent',
							padding: '0',
						}}
						type='submit'>
						<i
							style={{ color: '#95a5a6' }}
							className='fas fa-search'
						/>
					</button>
				</InputGroup.Text>
			</InputGroup>
		</Form>
	);
};

export default SearchBox;
