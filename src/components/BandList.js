import React, { useEffect, useState } from 'react';

const defaultBands = [{ id: 'bcc84926-cf19-4b7d-b35f-ec00f89a43a7', name: 'Metalica', votes: 0 }];

export default function BandList({ data = defaultBands }) {
	const [bands, setBands] = useState(data);

	useEffect(() => {
		setBands(data);
	}, [data]);

	const cambiarNombre = (event, id) => {
		const nuevoNombre = event.target.value;

		setBands((bands) =>
			bands.map((band) => {
				if (band.id === id) {
					band.name = nuevoNombre;
				}
				return band;
			})
		);
	};

	const onPerdioFoco = (id, nombre) => {
		console.log(id, nombre);

		//todo: disparar evento de socket
	};

	const crearRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button className='btn btn-primary'> + 1</button>
				</td>
				<td>
					<input
						className='from-control'
						value={band.name}
						onChange={(event) => cambiarNombre(event, band.id)}
						onBlur={() => onPerdioFoco(band.id, band.name)}></input>
				</td>
				<td>
					<h3>{band.votes}</h3>
				</td>
				<td>
					<button className='btn btn-danger'>Borrar</button>
				</td>
			</tr>
		));
	};

	return (
		<table className='table table-stripped'>
			<thead>
				<tr>
					<th></th>
					<th>Nombre</th>
					<th>Votos</th>
					<th>Borrar</th>
				</tr>
			</thead>
			<tbody>{crearRows()}</tbody>
		</table>
	);
}
