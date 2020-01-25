/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import moment from 'moment'
import * as moment from 'moment';
import 'moment/locale/ru';
import FlightCard from '../../components/FlightCard/FlightCard';
import Controls from '../../components/Controls/Controls';
import Select from 'react-select';

import styles from './SVO.styl';

moment.locale('ru');

const SVO = props => {
	const [departure, setDeparture] = useState(true);
	const [flightsInfo, setFlightsInfo] = useState();

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
				const options = [];
				data.appendix.airports.map(airport => {
					if (!countries.includes(airport.countryName)) {
						countries.push(airport.countryName);
						options.push({
							value: airport.countryCode,
							label: airport.countryName,
						});
					}
				});
				setFlightsInfo({
					flights: data.scheduledFlights,
					countries: options,
					airports: data.appendix.airports,
				});
			});
	};

	const sortByFlightNumber = sortType => {
		const copyFlights = [...flightsInfo.flights];
		const copyInfo = Object.create(flightsInfo);
		if (sortType === 'increase') {
			const sortedFlightsList = copyFlights.sort((prev, next) => prev.flightNumber - next.flightNumber);
			setFlightsInfo(
				Object.assign(copyInfo, {
					flights: sortedFlightsList,
				})
			);
		} else if (sortType === 'decrease') {
			const sortedFlightsList = copyFlights.sort((prev, next) => next.flightNumber - prev.flightNumber);
			setFlightsInfo(
				Object.assign(copyInfo, {
					flights: sortedFlightsList,
				})
			);
		}
	};

	const sortByCountry = event => {
		const selectedCountries = [];
		const otherCountries = [];
		const copyInfo = Object.create(flightsInfo);
		flightsInfo.flights.map(flight => {
			let flightCountry;
			flightsInfo.airports.map(airport => {
				return airport.fs === flight.arrivalAirportFsCode ? (flightCountry = airport.countryName) : null;
			});
			if (flightCountry === event.label) {
				return selectedCountries.push(flight);
			} else {
				return otherCountries.push(flight);
			}
		});
		const sortedCountries = [...selectedCountries, ...otherCountries];
		setFlightsInfo(
			Object.assign(copyInfo, {
				flights: sortedCountries,
			})
		);
	};

	useEffect(() => {
		getDepartureFlights();
	}, []);

	return (
		<div className={styles.main}>
			<div className="row">
				{flightsInfo ? (
					<>
						<span>Сортировка по стране: </span>
						<Select onChange={sortByCountry} label="Single select" options={flightsInfo.countries} />
						<button onClick={() => sortByFlightNumber('increase')}>Сортировка по возрастанию номеру полета</button>
						<button onClick={() => sortByFlightNumber('decrease')}>Сортировка по убыванию номеру полета</button>
						{flightsInfo.flights.map(flight => {
							const country = flightsInfo.airports.map(airport => {
								return airport.fs === flight.arrivalAirportFsCode ? airport.countryName : null;
							});

							if (departure) {
								return (
									<FlightCard
										flightNumber={flight.flightNumber}
										time={moment(flight.departureTime).format('h:mm')}
										date={moment(flight.departureTime).format('MMM Do')}
										country={country}
										terminal={flight.departureTerminal}
										key={flight.flightNumber}
									/>
								);
							} else {
								return;
							}
						})}
					</>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</div>
	);
};

export default SVO;
