import React, { useState } from 'react';
import * as moment from 'moment';
import 'moment/locale/ru';
import axios from 'axios';
import styles from './FlightInfo.styl';
import { BrowserRouter as Router, Redirect, useLocation } from 'react-router-dom';

const FlightInfo = props => {
	const [email, setEmail] = useState('');

	const location = useLocation();
	if (location.info) {
		const countryTo = location.info.countryTo;
		const countryFrom = location.info.countryFrom;
		const data = location.info.data;
		const flightType = location.info.flightType;
		const terminal = location.info.terminal;
		console.log(location.info);

		const changeMail = e => {
			const newValue = e.target.value;

			setEmail(newValue);
		};

		const sendMail = async () => {
			const flightNumber = data.flightNumber;
			const departureAirportFsCode = data.departureAirportFsCode;
			const arrivalAirportFsCode = data.arrivalAirportFsCode;
			const stops = data.stops;
			const departureDate = moment(data.departureTime).format('DD/MM/YYYY');
			const arrivalDate = moment(data.arrivalTime).format('DD/MM/YYYY');
			const departureTime = moment(data.departureTime).format('H:mm');
			const arrivalTime = moment(data.arrivalTime).format('H:mm');
			const flightType1 = flightType ? 'вылета' : 'прилета';
			const serviceType = data.serviceType;
            let html = `
                <ul>
                    <li>Аэропорт вылета: ${departureAirportFsCode}</li>
                    <li>Аэропорт прилета: ${arrivalAirportFsCode}</li>
                    <li>Остановок: ${stops}</li>
                    <li>Откуда ${countryFrom}</li>
                    <li>Куда: ${countryTo}</li>
                    <li>Дата вылета: ${departureDate}</li>
                    <li>Дата прилета: ${arrivalDate}</li>
                    <li>Время вылета: ${departureTime}</li>
                    <li>Время прилета: ${arrivalTime}</li>
                    <li>Терминал ${flightType1}: ${terminal}</li>
                    <li>Тип сервиса: ${serviceType}</li>
                </ul>
            `
			await axios({
				url: 'http://localhost:3001/sendmail',
				method: 'POST',
				data: {
                    html,
                    email,
                    subject: `Информация о полете  №${flightNumber}`
				},
            });
		};

		return (
			<div className={styles.card}>
				<div>
					<h1 className={styles.title}>Рейс: {data.flightNumber}</h1>
					<div className={styles.info}>
						<div className={styles.infoBlock}>
							<div className={styles.text}>Аэропорт вылета: {data.departureAirportFsCode}</div>
							<div className={styles.text}>Аэропорт прилета: {data.arrivalAirportFsCode}</div>
							<div className={styles.text}>Остановок: {data.stops}</div>

							<div className={styles.text}>
								<div>Откуда {countryFrom}</div>
								<div>Куда: {countryTo}</div>
							</div>
							<div className={styles.text}>Дата вылета: {moment(data.departureTime).format('DD/MM/YYYY')}</div>
							<div className={styles.text}>Дата прилета: {moment(data.arrivalTime).format('DD/MM/YYYY')}</div>
							<div className={styles.text}>Время вылета: {moment(data.departureTime).format('H:mm')}</div>
							<div className={styles.text}>Время прилета: {moment(data.arrivalTime).format('H:mm')}</div>
							<div className={styles.text}>
								Терминал {flightType ? 'вылета' : 'прилета'}: {terminal}
							</div>
							<div className={styles.text}>Тип сервиса: {data.serviceType}</div>
						</div>
					</div>
				</div>
				<input type="text" value={email} onChange={changeMail} placeholder="Введите email" />
				<input type="submit" onClick={sendMail} placeholder="Отправить" />
			</div>
		);
	} else {
		return <Redirect to="/" />;
	}
};

export default FlightInfo;
