import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('');
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
					<i style={{ color: '#95a5a6' }} className='fas fa-search' />
				</InputGroup.Text>
			</InputGroup>

			{/* <Button
				type='submit'
				size='sm'
				variant={window.innerWidth > 430 ? 'secondary' : 'primary'}
				className='ms-2'>
				Search
			</Button> */}
		</Form>
	);
};

export default SearchBox;
