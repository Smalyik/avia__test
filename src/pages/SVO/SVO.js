/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightCard from '../../components/FlightCard/FlightCard';
import Controls from '../../components/Controls/Controls';

import styles from './SVO.styl';

const SVO = props => {
	const [departure, setDeparture] = useState(true);
	const [flights, setFlights] = useState(null);
	const [airports, setAirports] = useState(null);
	const [countries, setCountries] = useState(null);

	const sortByCountry = event => {
		console.log(event.target);
		const sortedFlights = flights.map((flight, index) => {
			// console.log(event);
		});
	};

	const getDepartureFlights = async () => {
		axios('http://localhost:3001/flights', {
			params: {
				year: 2020,
				month: 1,
				day: 24,
				hour: 22,
			},
		})
			.then(response => response.data)
			.then(data => {
				console.log(data);
				const countries = [];
				data.appendix.airports.map(airport => {
					return countries.includes(airport.countryName) ? null : countries.push(airport.countryName);
				});
				setCountries(countries);
				setFlights(data.scheduledFlights);
				setAirports(data.appendix.airports);
			});
	};

	useEffect(() => {
		getDepartureFlights();
	}, []);

	return (
		<div className={styles.main}>
			<div className="row">
				<span>Сортировка по стране: </span>
				<select onChange={sortByCountry}>
					{countries !== null
						? countries.map(country => {
								return (
									<option value={country} key={country}>
										{country}{' '}
									</option>
								);
						  })
						: null}
				</select>
				{flights !== null && airports !== null
					? flights.map(flight => {
							let country;

							airports.map(airport => {
								return airport.fs === flight.arrivalAirportFsCode ? (country = airport.countryName) : null;
							});

							if (departure) {
								return (
									<FlightCard
										flightNumber={flight.flightNumber}
										date={flight.departureTime}
										country={country}
										terminal={flight.departureTerminal}
										key={flight.flightNumber}
									/>
								);
							} else {
								return;
							}
					  })
					: null}
			</div>
		</div>
	);
};

export default SVO;
