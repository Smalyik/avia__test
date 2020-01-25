import React from 'react';

import styles from './FlightCard.styl';

const FlightCard = props => {
	return (
		<div className={styles.card}>
			<h1 className={styles.title}>Рейс: {props.flightNumber}</h1>
			<div className={styles.info}>
				<div className={styles.infoBlock}>
					<div className={styles.text}>
						Дата {props.departure ? 'прилета' : 'вылета'}: {props.date}
					</div>
					<div className={styles.text}>
						Время {props.departure ? 'прилета' : 'вылета'}: {props.time}
					</div>
					<div className={styles.text}>
						Куда: {props.country}
					</div>
					<div className={styles.text}>
						Терминал {props.departure ? 'прилета' : 'вылета'}: {props.terminal}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlightCard;
