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
	const [isLetterSortToUp, setIsLetterSortToUp] = useState(true);
	const [isTimeSortToUp, setIsTimeSortToUp] = useState(true)

	const getDepartureFlights = async () => {
		const flightType = departure ? 'departing' : 'arriving'
		axios('http://localhost:3001/flights', {
			params: {
				flightType: flightType,
				airport: 'SVO',
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

	const sortByTime = () => {
		const copyFlights = [...flightsInfo.flights];
		const copyInfo = Object.create(flightsInfo);
		let sortedFlightsList

		if (isTimeSortToUp) {
			sortedFlightsList = flightsInfo.flights.sort((prev, next) => {
				const timePrev = prev.departureTime;
				const timeNext = next.departureTime;
				const hoursPrev = (moment(timePrev).format('h') * 60);
				const minutesPrev = Number(moment(timePrev).format('mm'))
				const prevTimeInMinutes = hoursPrev + minutesPrev
				
				const hoursNext = (moment(timeNext).format('h') * 60);
				const minutesNext = Number(moment(timeNext).format('mm'))
				const nextTimeInMinutes = hoursNext + minutesNext
	
				return prevTimeInMinutes - nextTimeInMinutes;
			});
			setIsTimeSortToUp(false)
		} else {
			sortedFlightsList = flightsInfo.flights.sort((prev, next) => {
				const timePrev = prev.departureTime;
				const timeNext = next.departureTime;
				const hoursPrev = (moment(timePrev).format('h') * 60);
				const minutesPrev = Number(moment(timePrev).format('mm'))
				const prevTimeInMinutes = hoursPrev + minutesPrev
				
				const hoursNext = (moment(timeNext).format('h') * 60);
				const minutesNext = Number(moment(timeNext).format('mm'))
				const nextTimeInMinutes = hoursNext + minutesNext
	
				return nextTimeInMinutes - prevTimeInMinutes;
			});
			setIsTimeSortToUp(true)
		}
		
		setFlightsInfo(
			Object.assign(copyInfo, {
				flights: sortedFlightsList,
			})
		);
	}

	const sortByGate = sortType => {
		const copyFlights = [...flightsInfo.flights];
		const copyInfo = Object.create(flightsInfo);
		let sortedFlightsList;
		switch (sortType) {
			case 'letter':
				if (isLetterSortToUp) {
					sortedFlightsList = copyFlights.sort((prev, next) => {
						let namePrev = prev.departureTerminal.toLowerCase(),
							nameNext = next.departureTerminal.toLowerCase();
						if (namePrev < nameNext) return -1;
						if (namePrev > nameNext) return 1;
						return 0;
					});
					setIsLetterSortToUp(false);
				} else {
					sortedFlightsList = copyFlights.sort((prev, next) => {
						let namePrev = prev.departureTerminal.toLowerCase(),
							nameNext = next.departureTerminal.toLowerCase();
						if (namePrev < nameNext) return 1;
						if (namePrev > nameNext) return -1;
						return 0;
					});
					setIsLetterSortToUp(true);
				}
				setFlightsInfo(
					Object.assign(copyInfo, {
						flights: sortedFlightsList,
					})
				);
				break;
			case 'number':
				sortedFlightsList = copyFlights.sort((prev, next) => {
					let namePrev = prev.departureTerminal,
						nameNext = next.departureTerminal;
					return namePrev - nameNext;
				});
				setFlightsInfo(
					Object.assign(copyInfo, {
						flights: sortedFlightsList,
					})
				);
				break;
			default:
				break;
		}
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

	const sortByCountry = option => {
		const selectedCountries = [];
		const otherCountries = [];
		const copyInfo = Object.create(flightsInfo);
		flightsInfo.flights.map(flight => {
			let flightCountry;
			flightsInfo.airports.map(airport => {
				return airport.fs === flight.arrivalAirportFsCode ? (flightCountry = airport.countryName) : null;
			});
			if (flightCountry === option.label) {
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

	const changeFlightType = flightType => {
		switch (flightType) {
			case 'departing':
				setFlightsInfo(null)
				setDeparture(true)
				break;
			case 'arriving':
				setFlightsInfo(null)
				setDeparture(false)
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		getDepartureFlights();
	}, []);

	useEffect(() => {
		getDepartureFlights();
	}, [departure])

	return (
		<div className={styles.main}>
			<div className="row">
				<div>
					<button onClick={() => changeFlightType('departing')}>Вылет</button>
					<button onClick={() => changeFlightType('arriving')}>Прилет</button>
				</div>
				{flightsInfo ? (
					<>
						<span>Сортировка по стране: </span>
						<Select onChange={sortByCountry} label="Single select" options={flightsInfo.countries} />
						<>
							<button onClick={() => sortByFlightNumber('increase')}>
								Сортировка по возрастанию номеру полета
							</button>
							<button onClick={() => sortByFlightNumber('decrease')}>Сортировка по убыванию номеру полета</button>
						</>
						<div>
							<button onClick={() => sortByGate('letter')}>Сортировка терминалов по буквам</button>
							<button onClick={() => sortByGate('number')}>Сортировка терминалов по цифрам</button>
						</div>
						<button onClick={sortByTime}>Сортировка по времени {departure ? 'вылета' : 'прилета'}</button>
						{flightsInfo.flights.map(flight => {
							const country = flightsInfo.airports.map(airport => {
								return airport.fs === flight.arrivalAirportFsCode ? airport.countryName : null;
							});

							if (departure) {
								return (
									<FlightCard
										flightType={departure}
										flightNumber={flight.flightNumber}
										time={moment(flight.departureTime).format('h:mm')}
										date={moment(flight.departureTime).format('MMM Do')}
										country={country}
										terminal={flight.departureTerminal ? flight.departureTerminal : '1'}
										key={flight.flightNumber}
									/>
								);
							} else {
								return (
									<FlightCard
										flightType={departure}
										flightNumber={flight.flightNumber}
										time={moment(flight.arrivalTime).format('h:mm')}
										date={moment(flight.arrivalTime).format('MMM Do')}
										country={country}
										terminal={flight.arrivalTerminal ? flight.arrivalTerminal : '1'}
										key={flight.flightNumber}
									/>
								);
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
