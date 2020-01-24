/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlightCard from '../../components/FlightCard/FlightCard';
import Controls from '../../components/Controls/Controls';
import Select from "react-select";

import styles from './SVO.styl';

const SVO = props => {
	const [departure, setDeparture] = useState(true);
	const [flights, setFlights] = useState(null);
	const [airports, setAirports] = useState(null);
	const [countries, setCountries] = useState(null);

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
				const options = []
				data.appendix.airports.map(airport => {
					if (!countries.includes(airport.countryName)) {
						countries.push(airport.countryName)
						options.push({
							value: airport.countryCode, label: airport.countryName
						})
					}
				});
				setCountries(options);
				setFlights(data.scheduledFlights);
				setAirports(data.appendix.airports);
			});
	};

	const sortByCountry = event => {
		const selectedCountries = []
		const otherCountries = []
		console.log(event)
		flights.map((flight, index) => {
			let flightCountry
			airports.map(airport => {
				return airport.fs === flight.arrivalAirportFsCode ? (flightCountry = airport.countryName) : null;
			});
			if (flightCountry === event.label) {
				return selectedCountries.push(flight)
			} else {
				return otherCountries.push(flight)
			}
		});
		const sortedCountries = [...selectedCountries, ...otherCountries]
		// console.log(selectedCountries)
		setFlights(sortedCountries)
	};

	useEffect(() => {
		getDepartureFlights();
	}, []);

	return (
		<div className={styles.main}>
			<div className="row">
				<span>Сортировка по стране: </span>
				<Select onChange={sortByCountry} label="Single select" options={countries} />
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
