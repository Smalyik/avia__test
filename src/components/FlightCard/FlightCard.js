import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import styles from './FlightCard.styl';

const FlightCard = props => {
	return (
		<div className={styles.card}>
			<h1 className={styles.title}>
				<Link
					to={{
						pathname: `/flights/${props.flightNumber}`,
						info: {
							data: props.data,
							countryTo: props.countryTo,
							countryFrom: props.countryFrom,
							date: props.date,
							time: props.time,
							flightType: props.flightType,
							terminal: props.terminal,
						},
					}}
				>
					Рейс: {props.flightNumber}
				</Link>
			</h1>
			<div className={styles.info}>
				<div className={styles.infoBlock}>
					<div className={styles.text}>
						Дата {props.flightType ? 'вылета' : 'прилета'}: {props.date}
					</div>
					<div className={styles.text}>
						Время {props.flightType ? 'вылета' : 'прилета'}: {props.time}
					</div>
					<div className={styles.text}>
						<div>Откуда {props.countryFrom}</div>
						<div>Куда: {props.countryTo}</div>
					</div>
					<div className={styles.text}>
						Терминал {props.flightType ? 'вылета' : 'прилета'}: {props.terminal}
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlightCard;
