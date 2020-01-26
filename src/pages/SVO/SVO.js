/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import moment from 'moment'
import * as moment from 'moment';
import 'moment/locale/ru';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import FlightCard from '../../components/FlightCard/FlightCard';
import Controls from '../../components/Controls/Controls';
import Select from 'react-select';

import styles from './SVO.styl';

moment.locale('ru');

const SVO = props => {
	const [departure, setDeparture] = useState(true);
	const [flightsInfo, setFlightsInfo] = useState({});
	const [prevFlightsInfo, setPrevFlightsInfo] = useState();
	const [isLetterSortToUp, setIsLetterSortToUp] = useState(true);
	const [isTimeSortToUp, setIsTimeSortToUp] = useState(true);
	const [searchInput, setSearchInput] = useState('');
	const [startDateState, setStartDateState] = useState(moment().hours(0).minutes(0));
	const [endDateState, setEndDateState] = useState(moment().hours(0).minutes(0).add(1, 'days'));
	const [focusedInputDate, setFocusedInputDate] = useState(null);

	const getDepartureFlights = async (date, day) => {
		const flightType = departure ? 'departing' : 'arriving';
		axios('http://localhost:3001/flights', {
			params: {
				flightType: flightType,
				airport: 'SVO',
				year: date.years,
				month: date.months + 1,
				day: date.date,
				hour: date.hours,
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
				const flightsCopy = Object.assign(flightsInfo, {})
				if (flightsCopy.flights) {
					const newFlightsInfo = {
						flights: [...data.scheduledFlights, ...flightsCopy.flights],
						countries: [...options, ...flightsCopy.countries],
						airports: [...data.appendix.airports, ...flightsCopy.airports],
					}
					setFlightsInfo(newFlightsInfo);
				} else {
					const newFlightsInfo = {
						flights: data.scheduledFlights,
						countries: options,
						airports: data.appendix.airports,
					}
					setFlightsInfo(newFlightsInfo);
				}
				
			});
	};

	const sortByTime = () => {
		const copyFlights = [...flightsInfo.flights];
		const copyInfo = Object.create(flightsInfo);
		let sortedFlightsList;

		if (isTimeSortToUp) {
			sortedFlightsList = flightsInfo.flights.sort((prev, next) => {
				const timePrev = prev.departureTime;
				const timeNext = next.departureTime;
				const hoursPrev = moment(timePrev).format('h') * 60;
				const minutesPrev = Number(moment(timePrev).format('mm'));
				const prevTimeInMinutes = hoursPrev + minutesPrev;

				const hoursNext = moment(timeNext).format('h') * 60;
				const minutesNext = Number(moment(timeNext).format('mm'));
				const nextTimeInMinutes = hoursNext + minutesNext;

				return prevTimeInMinutes - nextTimeInMinutes;
			});
			setIsTimeSortToUp(false);
		} else {
			sortedFlightsList = flightsInfo.flights.sort((prev, next) => {
				const timePrev = prev.departureTime;
				const timeNext = next.departureTime;
				const hoursPrev = moment(timePrev).format('h') * 60;
				const minutesPrev = Number(moment(timePrev).format('mm'));
				const prevTimeInMinutes = hoursPrev + minutesPrev;

				const hoursNext = moment(timeNext).format('h') * 60;
				const minutesNext = Number(moment(timeNext).format('mm'));
				const nextTimeInMinutes = hoursNext + minutesNext;

				return nextTimeInMinutes - prevTimeInMinutes;
			});
			setIsTimeSortToUp(true);
		}

		setFlightsInfo(
			Object.assign(copyInfo, {
				flights: sortedFlightsList,
			})
		);
	};

	const sortByGate = sortType => {
		const copyFlights = [...flightsInfo.flights];
		const copyInfo = Object.create(flightsInfo);
		let sortedFlightsList;
		switch (sortType) {
			case 'letter':
				if (departure) {
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
				} else {
					if (isLetterSortToUp) {
						sortedFlightsList = copyFlights.sort((prev, next) => {
							let namePrev = prev.arrivalTerminal.toLowerCase(),
								nameNext = next.arrivalTerminal.toLowerCase();
							if (namePrev < nameNext) return -1;
							if (namePrev > nameNext) return 1;
							return 0;
						});
						setIsLetterSortToUp(false);
					} else {
						sortedFlightsList = copyFlights.sort((prev, next) => {
							let namePrev = prev.arrivalTerminal.toLowerCase(),
								nameNext = next.arrivalTerminal.toLowerCase();
							if (namePrev < nameNext) return 1;
							if (namePrev > nameNext) return -1;
							return 0;
						});
						setIsLetterSortToUp(true);
					}
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
				if (departure) {
					return airport.fs === flight.arrivalAirportFsCode ? (flightCountry = airport.countryName) : null;
				} else {
					return airport.fs === flight.departureAirportFsCode ? (flightCountry = airport.countryName) : null;
				}
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
				setFlightsInfo({});
				setDeparture(true);
				break;
			case 'arriving':
				setFlightsInfo({});
				setDeparture(false);
				break;
			default:
				break;
		}
	};

	const searchFlightByNumber = event => {
		const prevValue = searchInput;
		const nextValue = event.target.value;

		const isRemoveOperation = nextValue < prevValue;

		const onlyNumbersRegexp = new RegExp(/^\d+$/);

		if (nextValue === '') {
			setSearchInput('');
		} else if (event.target.value.match(onlyNumbersRegexp)) {
			setSearchInput(nextValue);
		}

		if (isRemoveOperation) {
			return setFlightsInfo(prevFlightsInfo);
		}

		const copyFlights = [...flightsInfo.flights];
		const copyInfo = Object.create(flightsInfo);
		const sortedFlightsList = copyFlights.filter(flight => {
			return flight.flightNumber.includes(nextValue);
		});

		setPrevFlightsInfo(flightsInfo);

		setFlightsInfo(
			Object.assign(copyInfo, {
				flights: sortedFlightsList,
			})
		);
	};

	const onDatesChange = (startDate, endDate) => {
		if (startDate && endDate) {
			const startDateCopy = Object.assign(moment(startDate.toDate()), {})		
			const daysDiff = endDate.diff(startDateCopy, 'days')
			for (let i = 0; i < daysDiff; i++) {
				startDateCopy.date += 1
				for (let j = 0; j < 23; j++) {
					startDateCopy.hours += 1
					getDepartureFlights(startDateCopy);
				}
				startDateCopy.hours = 0
			}
		}
		setStartDateState(startDate)
		setEndDateState(endDate)
	}

	useEffect(() => {
		getDepartureFlights(moment().toObject(), moment().date());
	}, [departure]);

	return (
		<div className={styles.main}>
			<div className="row">
				<div>
					<button onClick={() => changeFlightType('departing')}>Вылет</button>
					<button onClick={() => changeFlightType('arriving')}>Прилет</button>
				</div>
				{flightsInfo ? (
					<>
						<DateRangePicker
							startDate={startDateState}
							startDateId={`${startDateState}`}
							endDate={endDateState}
							endDateId={`${endDateState}`}
							onDatesChange={({ startDate, endDate }) => onDatesChange(startDate, endDate)}
							focusedInput={null}
							onFocusChange={focusedInput => setFocusedInputDate(focusedInput)}
							numberOfMonths={12}
						/>
						<div>
							<label>
								<span>Поиск по номеру полета: </span>
								<input onChange={searchFlightByNumber} type="tel" value={searchInput} />
							</label>
						</div>
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
						{flightsInfo.flights && flightsInfo.flights.length > 0 ? (
							flightsInfo.flights.map(flight => {
								const countryTo = flightsInfo.airports.map(airport => {
									return airport.fs === flight.arrivalAirportFsCode ? airport.countryName : null;
								});
								const countryFrom = flightsInfo.airports.map(airport => {
									return airport.fs === flight.departureAirportFsCode ? airport.countryName : null;
								});
								
								if (departure) {
									const date = moment(flight.departureTime).toObject();
									return (
										<FlightCard
											flightType={departure}
											flightNumber={flight.flightNumber}
											time={`${date.hours}:${
												String(date.minutes).length === 1 ? '0' + date.minutes : date.minutes
											}`}
											date={moment(flight.departureTime).format('MMM Do')}
											countryFrom={countryFrom}
											countryTo={countryTo}
											terminal={flight.departureTerminal ? flight.departureTerminal : '1'}
											key={Math.random()}
										/>
									);
								} else {
									const date = moment(flight.arrivalTime).toObject();
									return (
										<FlightCard
											flightType={departure}
											flightNumber={flight.flightNumber}
											time={`${date.hours}:${
												String(date.minutes).length === 1 ? '0' + date.minutes : date.minutes
											}`}
											date={moment(flight.arrivalTime).format('MMM Do')}
											countryFrom={countryFrom}
											countryTo={countryTo}
											terminal={flight.arrivalTerminal ? flight.arrivalTerminal : '1'}
											key={flight.referenceCode}
										/>
									);
								}
							})
						) : (
							<div>Нет полетов на это время</div>
						)}
					</>
				) : (
					<div>Loading...</div>
				)}
			</div>
		</div>
	);
};

export default SVO;
