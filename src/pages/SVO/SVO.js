/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import moment from 'moment'
import * as moment from 'moment';
import 'moment/locale/ru';
import FlightCard from '../../components/FlightCard/FlightCard';
import Controls from '../../components/Controls/Controls';
import Select from "react-select";

import styles from './SVO.styl';

moment.locale('ru')

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

	const sortByFlightNumber = sortType => {
		const copyFlights = [...flights]
		if (sortType === 'increase') {
			const sortedFlightsList = copyFlights.sort((prev, next) => prev.flightNumber - next.flightNumber)
			setFlights(sortedFlightsList)
		} else if (sortType === 'decrease') {
			const sortedFlightsList = copyFlights.sort((prev, next) => next.flightNumber - prev.flightNumber)
			setFlights(sortedFlightsList)
		}
	}

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
		setFlights(...sortedCountries)
	};

	useEffect(() => {
		getDepartureFlights();
	}, []);

	return (
		<div className={styles.main}>
			<div className="row">
				<span>Сортировка по стране: </span>
				<Select onChange={sortByCountry} label="Single select" options={countries} />
				<button onClick={() => sortByFlightNumber('increase')}>Сортировка по возрастанию номеру полета</button>
				<button onClick={() => sortByFlightNumber('decrease')}>Сортировка по убыванию номеру полета</button>
				{flights !== null && airports !== null
					? flights.map(flight => {
							let country
							airports.map(airport => {
								return airport.fs === flight.arrivalAirportFsCode ? (country = airport.countryName) : null;
							});

							if (departure) {
								return (
									<FlightCard
										flightNumber={flight.flightNumber}
										time={moment(flight.departureTime).format("h:mm")}
										date={moment(flight.departureTime).format("MMM Do")}
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
