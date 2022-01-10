import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listAllUsers, deleteUser, refreshLogin } from '../actions/userActions';
import Paginate from '../components/Paginate';

const UserListPage = ({ match, history }) => {
	const pageNumber = match.params.pageNumber || 1; // to fetch various pages of orders
	const dispatch = useDispatch();
	const userList = useSelector((state) => state.userList);
	const { loading, users, error, page, pages, total } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	const userDetails = useSelector((state) => state.userDetails);
	const { error: userLoginError } = userDetails;

	useEffect(() => {
		if (userLoginError && userInfo && !userInfo.isSocialLogin) {
			const user = JSON.parse(localStorage.getItem('userInfo'));
			user && dispatch(refreshLogin(user.email));
		}
	}, [userLoginError, dispatch, userInfo]);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) dispatch(listAllUsers(pageNumber));
		else history.push('/login');
	}, [dispatch, history, userInfo, successDelete, pageNumber]);

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you wanna delete user?'))
			dispatch(deleteUser(id));
	};
	return (
		<>
			<h1>Users ({`${total || 0}`})</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message dismissible variant='danger' duration={10}>
					{error}
				</Message>
			) : (
				<Table
					striped
					bordered
					responsive
					className='table-sm text-center'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>CONFIRMED</th>
							<th>ADMIN</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map((user) => {
								return (
									<tr key={user._id}>
										<td>{user._id}</td>
										<td>{user.name}</td>
										<td>
											<a href={`mailto:${user.email}`}>
												{user.email}
											</a>
										</td>
										<td>
											{user.isConfirmed ? (
												<i
													className='fas fa-check'
													style={{ color: 'green' }}
												/>
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												/>
											)}
										</td>
										<td>
											{user.isAdmin ? (
												<i
													className='fas fa-check'
													style={{ color: 'green' }}
												/>
											) : (
												<i
													className='fas fa-times'
													style={{ color: 'red' }}
												/>
											)}
										</td>

										<td
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-around',
											}}>
											<LinkContainer
												to={`/admin/user/${user._id}/edit`}>
												<Button
													variant='link'
													className='btn-sm'>
													<i className='fas fa-edit' />
												</Button>
											</LinkContainer>
											<Button
												className='btn-sm'
												variant='danger'
												onClick={() =>
													handleDelete(user._id)
												}>
												<i className='fas fa-trash' />
											</Button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			)}
			<Paginate
				pages={pages}
				page={page}
				isAdmin={true}
				forUsers={true}
			/>
		</>
	);
};

export default UserListPage;
