import BandAdd from './components/BandAdd';
import BandList from './components/BandList';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;
// #patron singleton para la conexión del socket con el servidor ⭐️⭐️⭐️
const connectSocketServer = () => {
	if (!socket) {
		// url del servidor al cual vamos a hacer la conexión
		console.log('Conectando al servidor');
		socket = io.connect('http://localhost:8080', {
			transports: ['websocket'],
		});
	}
	return socket;
};

function App() {
	const [socket] = useState(connectSocketServer());
	const [online, setOnline] = useState(false);
	const [bands, setBands] = useState([]);

	useEffect(() => {
		console.log('Antes de verificar la conexión del socket');
		console.log('Después de verificar la conexión del socket');
		setOnline(socket.connected);
	}, [socket]);

	useEffect(() => {
		socket.on('connect', () => {
			setOnline(true);
		});
		socket.on('disconnect', () => {
			setOnline(false);
		});
	}, [socket]);

	useEffect(() => {
		socket.on('current-bands', (bands) => {
			console.log(bands);
			setBands(bands);
		});
	}, [socket]);

	return (
		<div className='container'>
			<div className='alert'></div>
			<p>
				Service status:{' '}
				{online ? (
					<span className='text-success'>online</span>
				) : (
					<span className='text-danger'>offline</span>
				)}
			</p>

			<h1>BandNames</h1>
			<hr />

			<div className='row'>
				<div className='col-8'>
					<BandList data={bands} />
				</div>
				<div className='col-4'>
					<BandAdd />
				</div>
			</div>
		</div>
	);
}

export default App;
