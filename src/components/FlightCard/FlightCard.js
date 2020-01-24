import React from 'react';

import styles from './FlightCard.styl';

const FlightCard = props => {
	return (
		<div className={styles.card}>
			<h1 className={styles.title}>Рейс: {props.flightNumber}</h1>
			<div className={styles.info}>
				<div className={styles.infoBlock}>
					<div className={styles.text}>
						Время {props.departure ? 'вылета' : 'прилета'}: {props.date}
					</div>
					<div className={styles.text}>
						Куда: {props.country}
					</div>
					<div className={styles.text}>
						Терминал {props.departure ? 'вылета' : 'прилета'}: {props.terminal}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlightCard;