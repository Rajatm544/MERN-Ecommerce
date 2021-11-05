import React, { useState, useEffect } from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './styles/update-toast.css';

const ServiceWorkerWrapper = () => {
	const [showReload, setShowReload] = useState(false);
	const [waitingWorker, setWaitingWorker] = useState(null);

	const onSWUpdate = (registration) => {
		setShowReload(true);
		setWaitingWorker(registration.waiting);
	};

	// register the service worker on page load
	useEffect(() => {
		serviceWorkerRegistration.register({ onUpdate: onSWUpdate });
	}, []);

	// skip waiting and install new updates on page reload
	const reloadPage = () => {
		waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
		setShowReload(false);
		window.location.reload(true);
	};

	return (
		<ToastContainer className='update-toast' onClick={reloadPage}>
			<Toast show={showReload} onClose={reloadPage} bg='dark'>
				<Toast.Header>
					<strong className='me-auto text-black'>
						New Version Available
					</strong>
				</Toast.Header>
				<Toast.Body className='text-white'>
					Reload to see whats new!
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default ServiceWorkerWrapper;
