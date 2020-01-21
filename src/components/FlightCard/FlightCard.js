import React from 'react';

import styles from './FlightCard.styl';

const FlightCard = props => {
	return (
	<div className={styles.card}>
		<div className={styles.title}>Рейс: {props.flightNumber}</div>
		<div className={styles.transporter}>Перевозчик: {props.transporterName}</div>
		<div>
			<div className={styles.firstBlock}>
				<div className={styles.text}>Время вылета: {props.departureDate}</div>
				<div className={styles.text}>Страна вылета: {props.departureCountry}</div>
				<div className={styles.text}>Терминал вылета: {props.departureTerminal}</div>
			</div>
			<div className={styles.secondBlock}>
				<div className={styles.text}>Время прилета: {props.arrivalDate}</div>
				<div className={styles.text}>Страна прилета: {props.arrivalCountry}</div>
				<div className={styles.text}>Терминал прилета: {props.arrivalTerminal}</div>
			</div>
		</div>
	</div>);
};

export default FlightCard;
