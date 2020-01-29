import React from 'react';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import Select from 'react-select';
import styles from './Controls.styl';

const Controls = props => {
	return (
		<>
			<div>Выбор по дате</div>
			<KeyboardDatePicker
				clearable
				value={props.pickedDate}
				placeholder="10/10/2018"
				onChange={date => props.onDatesChange(date)}
				minDate={new Date()}
				format="DD/MM/YYYY"
			/>
			<div>Выбор по времени</div>
			<KeyboardTimePicker
				ampm={false}
				variant="inline"
				label="With keyboard"
				value={props.pickedHour}
				format="HH"
				onChange={hour => props.onHourChange(hour)}
			/>
			<div>
				<label>
					<span>Поиск по номеру полета: </span>
					<input onChange={props.searchFlightByNumber} type="tel" value={props.searchInput} />
				</label>
			</div>
			<span>Сортировка по стране: </span>
			<Select onChange={props.sortByCountry} label="Single select" options={props.flightsInfo.countries} />
			<>
				<button onClick={() => props.sortByFlightNumber('increase')}>Сортировка по возрастанию номеру полета</button>
				<button onClick={() => props.sortByFlightNumber('decrease')}>Сортировка по убыванию номеру полета</button>
			</>
			<div>
				<button onClick={() => props.sortByTerminal('letter')}>Сортировка терминалов по буквам</button>
				<button onClick={() => props.sortByTerminal('number')}>Сортировка терминалов по цифрам</button>
			</div>
			<button onClick={props.sortByTime}>Сортировка по времени {props.departure ? 'вылета' : 'прилета'}</button>
		</>
	);
};

export default Controls;
