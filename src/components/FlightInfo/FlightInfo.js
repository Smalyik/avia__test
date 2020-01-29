import React from 'react';
import * as moment from 'moment';
import 'moment/locale/ru';
import styles from './FlightInfo.styl';
import { BrowserRouter as Router, Redirect, useLocation } from 'react-router-dom';

const FlightInfo = props => {
    const location = useLocation();
    if (location.info) {
        const countryTo = location.info.countryTo;
        const countryFrom = location.info.countryFrom;
        const data = location.info.data;
        const flightType = location.info.flightType;
        const terminal = location.info.terminal;
        console.log(location.info);

        return (
            <div className={styles.card}>
                <h1 className={styles.title}>Рейс: {data.flightNumber}</h1>
                <div className={styles.info}>
                    <div className={styles.infoBlock}>
                        <div className={styles.text}>
                            Аэропорт вылета: {data.departureAirportFsCode}
                        </div>
                        <div className={styles.text}>
                            Аэропорт прилета: {data.arrivalAirportFsCode}
                        </div>
                        <div className={styles.text}>
                            Остановок: {data.stops}
                        </div>
                        
                        <div className={styles.text}>
                            <div>Откуда {countryFrom}</div>
                            <div>Куда: {countryTo}</div>
                        </div>
                        <div className={styles.text}>
                            Дата вылета: {moment(data.departureTime).format('DD/MM/YYYY')}
                        </div>
                        <div className={styles.text}>
                            Дата прилета: {moment(data.arrivalTime).format('DD/MM/YYYY')}
                        </div>
                        <div className={styles.text}>
                            Время вылета: {moment(data.departureTime).format('H:mm')}
                        </div>
                        <div className={styles.text}>
                            Время прилета: {moment(data.arrivalTime).format('H:mm')}
                        </div>
                        <div className={styles.text}>
                            Терминал {flightType ? 'вылета' : 'прилета'}: {terminal}
                        </div>
                        <div className={styles.text}>
                            Тип сервиса: {data.serviceType}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <Redirect to="/" />
        )
    }
	
};

export default FlightInfo;
